// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmBjfRoYN8Oj2IK4XpjTONpoRIwfW9WIY",
    authDomain: "curryandgrill-c043d.firebaseapp.com",
    projectId: "curryandgrill-c043d",
    storageBucket: "curryandgrill-c043d.firebasestorage.app",
    messagingSenderId: "1063394384724",
    appId: "1:1063394384724:web:19cb1b6a1b596855c186c1",
    measurementId: "G-X8XLVPFRNP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const loginSection = document.getElementById('loginSection');
const adminSection = document.getElementById('adminSection');
const loginForm = document.getElementById('loginForm');
const loginAlert = document.getElementById('loginAlert');
const menuAlert = document.getElementById('menuAlert');
const logoutBtn = document.getElementById('logoutBtn');
const menuItemsList = document.getElementById('menuItemsList');
const addItemForm = document.getElementById('addItemForm');
const currentDateDisplay = document.getElementById('currentDateDisplay');
const currentDayDisplay = document.getElementById('currentDayDisplay');

let currentDay = 'monday';
let currentMenuItems = [];

// Initialize date display and set current day
function initializeDateDisplay() {
    const now = new Date();
    
    // Format date as "Friday, June 20, 2025"
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const formattedDate = now.toLocaleDateString('en-US', dateOptions);
    
    // Get current day name
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
    
    // Update display elements
    currentDateDisplay.textContent = formattedDate;
    currentDayDisplay.textContent = `Managing today's menu - ${dayName}`;
    
    // Set current day automatically
    currentDay = dayName.toLowerCase();
}

// Check if day has changed and clear menu if needed
async function checkDayChange() {
    try {
        // Get current day
        const now = new Date();
        const today = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        
        // Get stored day from Firebase
        const dayDoc = await db.collection('system').doc('currentDay').get();
        const storedDay = dayDoc.exists ? dayDoc.data().day : null;
        
        // If day has changed, clear all menu items
        if (storedDay && storedDay !== today) {
            console.log(`Day changed from ${storedDay} to ${today}. Clearing menu items...`);
            await clearAllMenuItems();
            showAlert('menuAlert', `New day detected! All menu items have been cleared for ${today}.`, 'info');
        }
        
        // Update the stored day
        await db.collection('system').doc('currentDay').set({
            day: today,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        currentDay = today;
        
    } catch (error) {
        console.error('Error checking day change:', error);
    }
}

// Clear all menu items (internal function)
async function clearAllMenuItems() {
    try {
        const snapshot = await db.collection('menu').get();
        const batch = db.batch();
        
        snapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        
        await batch.commit();
        console.log('All menu items cleared due to day change');
    } catch (error) {
        console.error('Error clearing menu items:', error);
        throw error;
    }
}

// Authentication State Observer
auth.onAuthStateChanged(async user => {
    if (user) {
        showAdminSection();
        initializeDateDisplay();
        await checkDayChange(); // Check for day change before loading menu
        loadMenuItems();
    } else {
        showLoginSection();
    }
});

// Show/Hide Sections
function showLoginSection() {
    loginSection.classList.remove('hidden');
    adminSection.classList.add('hidden');
}

function showAdminSection() {
    loginSection.classList.add('hidden');
    adminSection.classList.remove('hidden');
}

// Show Alert Messages
function showAlert(elementId, message, type = 'error') {
    const alertElement = document.getElementById(elementId);
    alertElement.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
        alertElement.innerHTML = '';
    }, 5000);
}

// Login Form Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        showAlert('loginAlert', 'Login successful!', 'success');
    } catch (error) {
        showAlert('loginAlert', `Login failed: ${error.message}`);
    }
});

// Logout Handler
logoutBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
        showAlert('loginAlert', 'Logged out successfully!', 'success');
    } catch (error) {
        showAlert('menuAlert', `Logout failed: ${error.message}`);
    }
});

// Load Menu Items
async function loadMenuItems() {
    try {
        menuItemsList.innerHTML = '<div class="loading">Loading menu items...</div>';
        
        const snapshot = await db.collection('menu').get();
        
        currentMenuItems = [];
        menuItemsList.innerHTML = '';
        
        if (snapshot.empty) {
            menuItemsList.innerHTML = `
                <div class="empty-state">
                    <h3>No menu items found</h3>
                    <p>Add some delicious items to get started!</p>
                </div>
            `;
            return;
        }
        
        snapshot.forEach(doc => {
            const item = { id: doc.id, ...doc.data() };
            currentMenuItems.push(item);
            displayMenuItem(item);
        });
        
    } catch (error) {
        console.error('Error loading menu items:', error);
        showAlert('menuAlert', `Error loading menu items: ${error.message}`);
        menuItemsList.innerHTML = '<div class="alert alert-error">Error loading menu items. Please try again.</div>';
    }
}

// Display Menu Item
function displayMenuItem(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'menu-item';
    itemDiv.innerHTML = `
        <div class="menu-item-info">
            <h4>${item.item}</h4>
            <p>Menu Item</p>
        </div>
        <div class="menu-item-actions">
            <span class="menu-item-price">$${item.price}</span>
            <button onclick="editMenuItem('${item.id}')" class="btn btn-small btn-secondary">Edit</button>
            <button onclick="deleteMenuItem('${item.id}')" class="btn btn-small btn-danger">Delete</button>
        </div>
    `;
    menuItemsList.appendChild(itemDiv);
}

// Add Item Form Handler
addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const itemName = document.getElementById('itemName').value.trim();
    const itemPrice = document.getElementById('itemPrice').value.trim();
    
    if (!itemName || !itemPrice) {
        showAlert('menuAlert', 'Please fill in all fields');
        return;
    }
    
    const itemData = {
        item: itemName,
        price: itemPrice
    };
    
    try {
        await db.collection('menu').add(itemData);
        showAlert('menuAlert', 'Menu item added successfully!', 'success');
        addItemForm.reset();
        loadMenuItems();
    } catch (error) {
        console.error('Error adding menu item:', error);
        showAlert('menuAlert', `Error adding menu item: ${error.message}`);
    }
});

// Edit Menu Item
async function editMenuItem(itemId) {
    const item = currentMenuItems.find(item => item.id === itemId);
    if (!item) return;
    
    const newItem = prompt('Enter new item name:', item.item);
    if (newItem === null || newItem.trim() === '') return;
    
    const newPrice = prompt('Enter new price:', item.price);
    if (newPrice === null || newPrice.trim() === '') return;
    
    try {
        await db.collection('menu').doc(itemId).update({
            item: newItem.trim(),
            price: newPrice.trim()
        });
        
        showAlert('menuAlert', 'Menu item updated successfully!', 'success');
        loadMenuItems();
    } catch (error) {
        console.error('Error updating menu item:', error);
        showAlert('menuAlert', `Error updating menu item: ${error.message}`);
    }
}

// Delete Menu Item
async function deleteMenuItem(itemId) {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    
    try {
        await db.collection('menu').doc(itemId).delete();
        showAlert('menuAlert', 'Menu item deleted successfully!', 'success');
        loadMenuItems();
    } catch (error) {
        console.error('Error deleting menu item:', error);
        showAlert('menuAlert', `Error deleting menu item: ${error.message}`);
    }
}

// Bulk Operations (manual clear all)
async function clearAllItems() {
    if (!confirm(`Are you sure you want to clear all menu items? This action cannot be undone.`)) return;
    
    try {
        await clearAllMenuItems();
        showAlert('menuAlert', `All menu items cleared successfully!`, 'success');
        loadMenuItems();
    } catch (error) {
        console.error('Error clearing menu items:', error);
        showAlert('menuAlert', `Error clearing menu items: ${error.message}`);
    }
}

// Periodic day check (every 30 minutes)
function startDayChangeMonitor() {
    setInterval(async () => {
        if (auth.currentUser) {
            await checkDayChange();
            if (currentMenuItems.length > 0) {
                loadMenuItems(); // Refresh menu items if they were cleared
            }
        }
    }, 30 * 60 * 1000); // Check every 30 minutes
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize date display immediately
    initializeDateDisplay();
    
    // Start monitoring for day changes
    startDayChangeMonitor();
    
    // Add event listeners for bulk operations if buttons exist
    const clearAllBtn = document.getElementById('clearAllBtn');
    
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearAllItems);
    }
});