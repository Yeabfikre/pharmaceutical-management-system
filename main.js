// EPSA Pharmaceutical Management System - Main JavaScript

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeTypedText();
    initializeCounters();
    initializeCharts();
    initializeAnimations();
    initializeInteractions();
    
    console.log('EPSA Pharmaceutical Management System initialized');
}

// Typed.js animation for hero text
function initializeTypedText() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: [
                'System',
                'Platform',
                'Solution',
                'for Ethiopia'
            ],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Animated counters for metrics
function initializeCounters() {
    const counters = [
        { id: 'total-medicines', target: 2847, duration: 2000 },
        { id: 'low-stock', target: 23, duration: 1500 },
        { id: 'expiry-alerts', target: 7, duration: 1000 },
        { id: 'active-orders', target: 15, duration: 1800 }
    ];

    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            animateCounter(element, counter.target, counter.duration);
        }
    });
}

function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    // Start animation after a delay
    setTimeout(updateCounter, 500);
}

// Initialize ECharts
function initializeCharts() {
    initializeInventoryChart();
}

function initializeInventoryChart() {
    const chartElement = document.getElementById('inventory-chart');
    if (!chartElement) return;

    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Stock In', 'Stock Out', 'Current Level'],
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Quantity'
            }
        ],
        series: [
            {
                name: 'Stock In',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    color: '#4ECDC4'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(78, 205, 196, 0.3)'
                        }, {
                            offset: 1, color: 'rgba(78, 205, 196, 0.1)'
                        }]
                    }
                },
                data: [1200, 1800, 1500, 2200, 1900, 2400, 2100]
            },
            {
                name: 'Stock Out',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    color: '#FF6B6B'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(255, 107, 107, 0.3)'
                        }, {
                            offset: 1, color: 'rgba(255, 107, 107, 0.1)'
                        }]
                    }
                },
                data: [800, 1200, 1100, 1600, 1400, 1800, 1500]
            },
            {
                name: 'Current Level',
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: '#3282B8',
                    width: 3
                },
                data: [2847, 3421, 3892, 4561, 4987, 5423, 5874]
            }
        ]
    };

    chart.setOption(option);
    
    // Make chart responsive
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// Initialize animations
function initializeAnimations() {
    // Animate cards on scroll
    const cards = document.querySelectorAll('.card-hover');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [20, 0],
                    opacity: [0, 1],
                    duration: 600,
                    easing: 'easeOutCubic',
                    delay: Math.random() * 200
                });
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });

    // Animate metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        anime({
            targets: card,
            scale: [0.9, 1],
            opacity: [0, 1],
            duration: 800,
            delay: index * 100,
            easing: 'easeOutElastic(1, .8)'
        });
    });
}

// Initialize interactive elements
function initializeInteractions() {
    // Quick action buttons
    const quickActions = document.querySelectorAll('.bg-teal-50, .bg-blue-50, .bg-amber-50, .bg-red-50');
    quickActions.forEach(action => {
        action.addEventListener('click', function() {
            const buttonText = this.querySelector('p').textContent;
            showNotification(`${buttonText} feature coming soon!`, 'info');
        });
    });

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow normal navigation - all pages are now functional
            // The href attributes are properly set to navigate to other pages
        });
    });

    // Main action buttons
    const mainButtons = document.querySelectorAll('button');
    mainButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('View Inventory')) {
                showNotification('Redirecting to Inventory Management...', 'success');
                setTimeout(() => {
                    window.location.href = 'inventory.html';
                }, 1000);
            } else if (this.textContent.includes('Generate Report')) {
                showNotification('Opening Reports Dashboard...', 'success');
                setTimeout(() => {
                    window.location.href = 'reports.html';
                }, 1000);
            } else if (!this.closest('.quick-actions') && this.textContent !== 'View Inventory' && this.textContent !== 'Generate Report') {
                showNotification('Feature coming soon!', 'info');
            }
        });
    });

    // Notification badge click
    const notificationBadge = document.querySelector('.notification-badge');
    if (notificationBadge) {
        notificationBadge.parentElement.addEventListener('click', function() {
            showNotification('You have 3 new notifications', 'info');
        });
    }

    // Activity items click
    const activityItems = document.querySelectorAll('.space-y-4 > div');
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            const activityText = this.querySelector('p').textContent;
            showNotification(`Viewing: ${activityText}`, 'info');
        });
    });

    // Warehouse status cards
    const warehouseCards = document.querySelectorAll('.border.border-gray-200.rounded-lg');
    warehouseCards.forEach(card => {
        card.addEventListener('click', function() {
            const warehouseName = this.querySelector('h4').textContent;
            showNotification(`Viewing details for ${warehouseName}`, 'info');
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300`;
    
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-amber-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${colors[type] || colors.info}`;
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
                ${getNotificationIcon(type)}
            </div>
            <div class="flex-1">
                <p class="text-sm font-medium">${message}</p>
            </div>
            <button class="flex-shrink-0 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>`,
        error: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>`,
        warning: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>`,
        info: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>`
    };
    return icons[type] || icons.info;
}

// Mock data for pharmaceutical system
const mockData = {
    medicines: [
        { id: 'MED001', name: 'Paracetamol 500mg', category: 'Analgesic', stock: 12500, expiry: '2026-12-31', warehouse: 'Central' },
        { id: 'MED002', name: 'Amoxicillin 250mg', category: 'Antibiotic', stock: 8500, expiry: '2026-08-15', warehouse: 'Regional' },
        { id: 'MED003', name: 'Ibuprofen 400mg', category: 'NSAID', stock: 6200, expiry: '2025-12-25', warehouse: 'Central' },
        { id: 'MED004', name: 'Metformin 500mg', category: 'Antidiabetic', stock: 9800, expiry: '2027-03-10', warehouse: 'District' },
        { id: 'MED005', name: 'Lisinopril 10mg', category: 'ACE Inhibitor', stock: 4500, expiry: '2026-11-20', warehouse: 'Regional' }
    ],
    
    warehouses: [
        { id: 'WH001', name: 'Central Warehouse', location: 'Addis Ababa', capacity: 78, status: 'Optimal' },
        { id: 'WH002', name: 'Regional Warehouse', location: 'Dire Dawa', capacity: 92, status: 'Near Full' },
        { id: 'WH003', name: 'District Storage', location: 'Bahir Dar', capacity: 45, status: 'Good' }
    ],
    
    orders: [
        { id: 'ORD001', supplier: 'MedSupply Co.', status: 'Delivered', amount: 45000, date: '2025-12-27' },
        { id: 'ORD002', supplier: 'PharmaCare Ltd.', status: 'In Transit', amount: 32000, date: '2025-12-28' },
        { id: 'ORD003', supplier: 'HealthPlus Inc.', status: 'Pending', amount: 28000, date: '2025-12-29' }
    ],
    
    alerts: [
        { type: 'expiry', medicine: 'Ibuprofen 400mg', daysLeft: 7, priority: 'Critical' },
        { type: 'low_stock', medicine: 'Amoxicillin 250mg', currentStock: 8500, threshold: 10000, priority: 'High' },
        { type: 'expiry', medicine: 'Aspirin 100mg', daysLeft: 15, priority: 'Medium' }
    ]
};

// Utility functions
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getStatusColor(status) {
    const colors = {
        'Optimal': 'text-green-600',
        'Good': 'text-green-600',
        'Near Full': 'text-amber-600',
        'Critical': 'text-red-600'
    };
    return colors[status] || 'text-gray-600';
}

function getPriorityColor(priority) {
    const colors = {
        'Critical': 'text-red-600 bg-red-100',
        'High': 'text-amber-600 bg-amber-100',
        'Medium': 'text-blue-600 bg-blue-100',
        'Low': 'text-gray-600 bg-gray-100'
    };
    return colors[priority] || 'text-gray-600 bg-gray-100';
}

// Export for use in other pages
window.EPSA = {
    mockData,
    showNotification,
    formatNumber,
    getStatusColor,
    getPriorityColor
};