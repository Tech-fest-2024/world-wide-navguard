document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map
    const map = L.map('map').setView([25.325366, 55.388962], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    const alMajaz = L.marker([25.325366, 55.388962], {
        icon: L.icon({ iconUrl: 'mb.png', iconSize: [40, 40] })
    }).addTo(map);

    // Initialize a variable to hold the user's location marker
    let userLocationMarker;
    let zoomLevel = 11; // Starting zoom level
    const maxZoomLevel = 18; // Maximum zoom level

    // Function to update user's location
    function updateUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;

                // Update the map view and zoom level
                map.setView([latitude, longitude], zoomLevel);

                // If the marker doesn't exist, create it
                if (!userLocationMarker) {
                    userLocationMarker = L.marker([latitude, longitude], {
                        icon: L.icon({
                            iconUrl: 'mr.png', // Red emergency icon or any icon of your choice
                            iconSize: [50, 50]
                        })
                    }).addTo(map);
                } else {
                    // Update the existing marker's position
                    userLocationMarker.setLatLng([latitude, longitude]);
                }
            }, () => {
                alert('Unable to retrieve your location.');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    // Call updateUserLocation every second
    setInterval(updateUserLocation, 1000); // Update every 1000 milliseconds (1 second)

    // Zoom controls
    document.getElementById('zoom-in').addEventListener('click', () => {
        zoomLevel = Math.min(zoomLevel + 1, maxZoomLevel); // Ensure zoom level does not exceed max zoom
        map.setZoom(zoomLevel);
        speak('Zoomed in');
    });

    document.getElementById('zoom-out').addEventListener('click', () => {
        zoomLevel = Math.max(zoomLevel - 1, 1); // Ensure zoom level does not go below min zoom
        map.setZoom(zoomLevel);
        speak('Zoomed out');
    });

    // Function to use Web Speech API for voice instructions
    function speak(text) {
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            synth.speak(utterance);
        }
    }

// Neighborhood data
const neighborhoods = {
        
    "Tiruchirappalli": [10.805080, 78.685425],
    "Chennai": [13.082680, 80.270718],
    "Bangalore": [12.971599, 77.594566],
    "Hyderabad": [17.385044, 78.486671],
    "Coimbatore": [11.016844, 76.955832],
    "Madurai": [9.925201, 78.119775],
    "Visakhapatnam": [17.686815, 83.218481],
    "Kochi": [9.931233, 76.267303],
    "Kozhikode": [11.258753, 75.780410],
    "Mangalore": [12.914142, 74.856018],
    "Salem": [11.664325, 78.146038],
    "Nagercoil": [8.179220, 77.434782],
    "Tirunelveli": [8.710144, 77.759777],
    "Tirupati": [13.628804, 79.419236],
    "Bhubaneswar": [20.296059, 85.818959],
    "Kannur": [11.868702, 75.370367],
    "Alappuzha": [9.498121, 76.338413],
    "Thiruvananthapuram": [8.524139, 76.936638],
    "Kollam": [8.891964, 76.634174],
    "Palakkad": [10.7765, 76.6542],
    "Kumbakonam": [10.9663, 79.3810],
    "Erode": [11.3411, 77.7172],
    "Abu Dhabi": [24.4539, 54.3773],
    "Dubai": [25.276987, 55.296249],
    "Sharjah": [25.3453, 55.4209],
    "Ajman": [25.4052, 55.5136],
    "Ras al-Khaimah": [25.8007, 55.9765],
    "Fujairah": [25.1150, 56.3331],
    "Umm al-Quwain": [25.5331, 55.5650],
    "Al Ain": [24.2075, 55.7490],
    "Dubai Marina": [25.0800, 55.1378],
    "Jumeirah": [25.2232, 55.2784],
    "Deira": [25.2767, 55.2962],
    "Bur Dubai": [25.2581, 55.3047],
    "Al Barsha": [25.1042, 55.1860],
    "Business Bay": [25.1890, 55.2719],
    "Al Garhoud": [25.2465, 55.3341],
    "Al Qusais": [25.2784, 55.4209],
    "Al Satwa": [25.2428, 55.2833],
    "Al Nahda": [25.303810, 55.377176],
    "Al Majaz": [25.325366, 55.388962],
    "Al Gharb": [25.357424, 55.390659],
    "Al Qasimiah": [25.346412, 55.397981],
    "Al Sharq": [25.366859, 55.402760],
    "Al Seneyat": [25.305378, 55.409551],
    "Al Jazeera": [25.3331, 55.3712],
    "Tugariet Muwaileh": [25.300143, 55.449436],
    "Al Riqah": [25.370377, 55.435854],
    "Halwan": [25.347588, 55.420762],
    "Al Hyrah": [25.383965, 55.418875],
    "Mughaider": [25.333775, 55.444415],
    "Wasit": [25.355857, 55.461474],
    "Muwailah": [25.291568, 55.509201],
    "Al Sajaah": [25.325954, 55.645404],
    "Al Ruqa Al Hamra": [25.340257, 55.514411],
    "University City": [25.299825, 55.483680],
    "Rahmaniyah": [25.337645, 55.580006],
    "Basaten Al Zubair": [25.382798, 55.618032],
    "Khalid Sea Port": [25.360974, 55.377697],
    "Al Siyuh": [25.244771, 55.619020],
    "Al Zubair": [25.375363, 55.685522],
    "Kaya Masaar": [25.2676, 55.6412],
    "Al Jlail": [25.337645, 55.448205],
    "Al Batayih": [25.207617, 55.732370],
    "Jweza": [25.2729, 55.6079],
    "Mehathab": [25.4047, 55.6424],
    "Al Tayy": [25.241847, 55.582719],
    "Al Sidairah": [25.351180, 55.691388],
    "New York": [40.712776, -74.005974],
    "Los Angeles": [34.052235, -118.243683],
    "Chicago": [41.878113, -87.629799],
    "Houston": [29.760427, -95.369804],
    "Phoenix": [33.448376, -112.074036],
    "Philadelphia": [39.952583, -75.165222],
    "San Antonio": [29.424122, -98.493629],
    "San Diego": [32.715736, -117.161087],
    "Dallas": [32.776665, -96.796989],
    "San Jose": [37.338208, -121.886329],
    "Austin": [30.267153, -97.743057],
    "Jacksonville": [30.332184, -81.655647],
    "San Francisco": [37.774929, -122.419418],
    "Indianapolis": [39.768403, -86.158068],
    "Columbus": [39.961346, -82.998756],
    "Fort Worth": [32.755489, -97.330765],
    "Charlotte": [35.227087, -80.843127],
    "Detroit": [42.331429, -83.045753],
    "El Paso": [31.761877, -106.485022],
    "Memphis": [35.149532, -90.048981],
    "Boston": [42.360082, -71.058880],
    "Seattle": [47.606209, -122.332069],
    "Denver": [39.739236, -104.990251],
    "Washington": [38.895111, -77.036369],
    "Nashville": [36.162664, -86.781602],
    "Baltimore": [39.290385, -76.612189],
    "Oklahoma City": [35.467560, -97.516428],
    "Las Vegas": [36.169941, -115.139832],
    "Louisville": [38.252665, -85.758456],
    "Milwaukee": [43.038902, -87.906471],
    "Albuquerque": [35.084385, -106.650421],
    "Tucson": [32.222608, -110.974709],
    "Fresno": [36.737797, -119.787125],
    "Sacramento": [38.575764, -121.478851],
    "Kansas City": [39.099727, -94.578567],
    "Mesa": [33.415185, -111.831487],
    "Atlanta": [33.749068, -84.388930],
    "Colorado Springs": [38.833882, -104.821363],
    "Virginia Beach": [36.852926, -75.977985],
    "Raleigh": [35.779591, -78.638175],
    "Omaha": [41.256537, -95.934503],
    "Miami": [25.761680, -80.191810],
    "Cleveland": [41.499321, -81.694361],
    "Tulsa": [36.153982, -95.992775],
    "Oakland": [37.804929, -122.271111],
    "Minneapolis": [44.977753, -93.265015],
    "Wichita": [37.687176, -97.330765],
    "Arlington": [32.735687, -97.108065],
    "Bakersfield": [35.373291, -119.018713],
    "Tampa": [27.950575, -82.457178],
    "Aurora": [39.729431, -104.831919],
    "Anaheim": [33.836593, -117.914301],
    "Honolulu": [21.306944, -157.858333],
    "Long Beach": [33.770050, -118.193739],
    "Kansas City": [39.099727, -94.578567],
    "Mesa": [33.415185, -111.831487],
    "Atlanta": [33.749068, -84.388930],
    "Colorado Springs": [38.833882, -104.821363],
    "Virginia Beach": [36.852926, -75.977985],
    "Raleigh": [35.779591, -78.638175],
    "Omaha": [41.256537, -95.934503],
    "Miami": [25.761680, -80.191810],
    "Cleveland": [41.499321, -81.694361],
    "Tulsa": [36.153982, -95.992775],
    "Oakland": [37.804929, -122.271111],
    "Minneapolis": [44.977753, -93.265015],
    "Wichita": [37.687176, -97.330765],
    "Arlington": [32.735687, -97.108065],
    "Bakersfield": [35.373291, -119.018713],
    "Tampa": [27.950575, -82.457178],
    "Aurora": [39.729431, -104.831919],
    "Anaheim": [33.836593, -117.914301],
    "Honolulu": [21.306944, -157.858333],
    "Long Beach": [33.770050, -118.193739],
    "Hialeah": [25.857596, -80.278105],
    "Chula Vista": [32.640057, -117.084200],
    "Brownsville": [25.901747, -97.497483],
    "Frisco": [33.150674, -96.823611],
    "McKinney": [33.197246, -96.639782],
    "Clearwater": [27.965853, -82.800102],
    "El Cajon": [32.794773, -116.962525],
    "Salem": [44.942358, -123.035095],
    "Cary": [35.791540, -78.781116],
    "New York": [40.712776, -74.005974],
    "London": [51.507351, -0.127758],
    "Tokyo": [35.689487, 139.691711],
    "Paris": [48.856613, 2.352222],
    "Sydney": [-33.868820, 151.209296],
    "Tiruchirappalli": [10.805080, 78.685425],
    "Berlin": [52.520008, 13.404954],
    "Moscow": [55.755825, 37.617298],
    "Dubai": [25.276987, 55.296249],
    "São Paulo": [-23.550520, -46.633308],
    "Mumbai": [19.076090, 72.877426],
    "Shanghai": [31.230416, 121.473701],
    "Istanbul": [41.008238, 28.978359],
    "Rome": [41.902783, 12.496366],
    "Bangkok": [13.756331, 100.501762],
    "Buenos Aires": [-34.603722, -58.381592],
    "Mexico City": [19.432608, -99.133209],
    "Seoul": [37.566536, 126.977966],
    "Jakarta": [-6.208763, 106.845599],
    "Lagos": [6.524379, 3.379206],
    "Cairo": [30.044420, 31.235712],
    "Kinshasa": [-4.321428, 15.313556],
    "Lima": [-12.046374, -77.042793],
    "Toronto": [43.651070, -79.347015],
    "Chicago": [41.878113, -87.629799],
    "Kolkata": [22.572645, 88.363892],
    "Athens": [37.983810, 23.727539],
    "Vienna": [48.208174, 16.373819],
    "Zurich": [47.376886, 8.541694],
    "Hong Kong": [22.319303, 114.169361],
    "Singapore": [1.352083, 103.819836],
    "Melbourne": [-37.813629, 144.963058],
    "Lisbon": [38.722252, -9.139337],
    "Doha": [25.276987, 51.520008],
    "Kuala Lumpur": [3.139000, 101.686900],
    "Tunis": [36.806451, 10.181534],
    "Manila": [14.599512, 120.984222],
    "Osaka": [34.693738, 135.502165],
    "Vancouver": [49.282729, -123.120738],
    "Cape Town": [-33.924869, 18.424055],
    "Copenhagen": [55.676098, 12.568337],
    "Stockholm": [59.329323, 18.068581],
    "Helsinki": [60.169856, 24.938379],
    "Amsterdam": [52.367573, 4.904138],
    "Munich": [48.135125, 11.581981],
    "Frankfurt": [50.110924, 8.682127],
    "Oslo": [59.913868, 10.752245],
    "Warsaw": [52.229676, 21.012229],
    "Budapest": [47.497913, 19.040236],
    "Prague": [50.075538, 14.437800],
    "Belgrade": [44.817634, 20.463300],
    "Sofia": [42.697708, 23.321868],
    "Bucharest": [44.426767, 26.102538],
    "Zagreb": [45.815011, 15.981919],
    "Ljubljana": [46.051080, 14.505126],
    "Sarajevo": [43.848637, 18.356437],
    "Skopje": [41.998100, 21.425400],
    "Tirana": [41.327500, 19.818900],
    "Podgorica": [42.441100, 19.263600],
    "Chisinau": [47.010500, 28.863800],
    "Minsk": [53.900600, 27.559000],
    "Kiev": [50.450100, 30.523400],
    "Vilnius": [54.687200, 25.279800],
    "Riga": [56.949600, 24.105900],
    "Tallinn": [59.437000, 24.753500],
    "Reykjavik": [64.146600, -21.942600],
    "Brussels": [50.850300, 4.351700],
    "Antwerp": [51.214000, 4.421300],
    "Ghent": [51.054300, 3.717400],
    "Bruges": [51.208200, 3.224700],
    "Stavanger": [58.970200, 5.733100],
    "Bergen": [60.392900, 5.324200],
    "Colombo": [6.927079, 79.934988],
    "Dhaka": [23.810311, 90.412521],
    "Lahore": [31.549700, 74.343600],
    "Karachi": [24.860700, 67.001100],
    "Baku": [40.409300, 49.867100],
    "Tbilisi": [41.715100, 44.827100],
    "Yerevan": [40.179200, 44.499100],
    "Kabul": [34.555300, 69.207500],
    "Tehran": [35.689200, 51.389000],
    "Baghdad": [33.315200, 44.366100],
    "Riyadh": [24.713600, 46.675300],
    "Jeddah": [21.485800, 39.192500],
    "Amman": [31.945400, 35.928400],
    "Abu Dhabi": [24.453900, 54.377300],
    "Manama": [26.238900, 50.586000],
    "Kuwait City": [29.375900, 47.977400],
    "Sharjah": [25.345300, 55.420900],
    "Muscat": [23.613000, 58.592100],
    "Sana'a": [15.369400, 44.191000],
    "Hanoi": [21.028500, 105.354200],
    "Ho Chi Minh City": [10.823100, 106.629700],
    "Brisbane": [-27.469800, 153.025100],
    "Perth": [-31.950500, 115.860500],
    "Adelaide": [-34.928500, 138.600700],
    "Hobart": [-42.882100, 147.327200],
    "Wellington": [-41.286500, 174.776200],
    "Auckland": [-36.848100, 174.769000],
    "Christchurch": [-43.532000, 172.636200],
    "Canberra": [-35.280900, 149.130000],
    "Alexandria": [31.215600, 29.955300],
    "Giza": [30.013100, 31.208900],
    "Port Said": [31.265300, 32.303000],
    "Luxor": [25.687200, 32.639600],
    "Aswan": [24.088900, 32.899700],
    "Khartoum": [15.500700, 32.559900],
    "Juba": [4.851600, 31.582000],
    "Addis Ababa": [9.145000, 40.489700],
    "Nairobi": [-1.286400, 36.817200],
    "Kampala": [0.347600, 32.582500],
    "Dar es Salaam": [-6.792400, 39.208300],
    "Mombasa": [-4.043500, 39.668200],
    "Accra": [5.603700, -0.187000],
    "Abuja": [9.057900, 7.495100],
    "Johannesburg": [-26.204100, 28.047300],
    "Durban": [-29.858700, 31.021800],
    "Port Elizabeth": [-33.918900, 25.570100],
    "Cape Town": [-33.924900, 18.424100],
    "Gaborone": [-24.628200, 25.923200],
    "Windhoek": [-22.559722, 17.083611],
    "Maputo": [-25.969200, 32.573200],
    "Lusaka": [-15.387530, 28.322820],
    "Harare": [-17.829222, 31.052222],
    "Kigali": [-1.970580, 30.104430],
    "Bujumbura": [-3.361080, 29.359880],
    "Banjul": [13.454900, -16.579000],
    "Freetown": [8.465700, -13.231700],
    "Conakry": [9.641200, -13.578400],
    "Monrovia": [6.300000, -10.800000],
    "Sierra Leone": [8.4860, -13.2335],
    "Gabon": [-0.8037, 11.6094],
    
        "Tiruchirappalli": [10.805080, 78.685425],
        "Chennai": [13.082680, 80.270718],
        "Bangalore": [12.971599, 77.594566],
        "Hyderabad": [17.385044, 78.486671],
        "Coimbatore": [11.016844, 76.955832],
        "Madurai": [9.925201, 78.119775],
        "Visakhapatnam": [17.686815, 83.218481],
        "Kochi": [9.931233, 76.267303],
        "Kozhikode": [11.258753, 75.780410],
        "Mangalore": [12.914142, 74.856018],
        "Salem": [11.664325, 78.146038],
        "Nagercoil": [8.179220, 77.434782],
        "Tirunelveli": [8.710144, 77.759777],
        "Tirupati": [13.628804, 79.419236],
        "Bhubaneswar": [20.296059, 85.818959],
        "Kannur": [11.868702, 75.370367],
        "Alappuzha": [9.498121, 76.338413],
        "Thiruvananthapuram": [8.524139, 76.936638],
        "Kollam": [8.891964, 76.634174],
        "Palakkad": [10.7765, 76.6542],
        "Kumbakonam": [10.9663, 79.3810],
        "Erode": [11.3411, 77.7172],
        "Abu Dhabi": [24.4539, 54.3773],
        "Dubai": [25.276987, 55.296249],
        "Sharjah": [25.3453, 55.4209],
        "Ajman": [25.4052, 55.5136],
        "Ras al-Khaimah": [25.8007, 55.9765],
        "Fujairah": [25.1150, 56.3331],
        "Umm al-Quwain": [25.5331, 55.5650],
        "Al Ain": [24.2075, 55.7490],
        "Dubai Marina": [25.0800, 55.1378],
        "Jumeirah": [25.2232, 55.2784],
        "Deira": [25.2767, 55.2962],
        "Bur Dubai": [25.2581, 55.3047],
        "Al Barsha": [25.1042, 55.1860],
        "Business Bay": [25.1890, 55.2719],
        "Al Garhoud": [25.2465, 55.3341],
        "Al Qusais": [25.2784, 55.4209],
        "Al Satwa": [25.2428, 55.2833],
        "New York": [40.712776, -74.005974],
        "London": [51.507351, -0.127758],
        "Tokyo": [35.689487, 139.691711],
        "Paris": [48.856613, 2.352222],
        "Sydney": [-33.868820, 151.209296],
        "Berlin": [52.520008, 13.404954],
        "Moscow": [55.755825, 37.617298],
        "São Paulo": [-23.550520, -46.633308],
        "Mumbai": [19.076090, 72.877426],
        "Shanghai": [31.230416, 121.473701],
        "Istanbul": [41.008238, 28.978359],
        "Rome": [41.902783, 12.496366],
        "Bangkok": [13.756331, 100.501765],
        "Los Angeles": [34.052235, -118.243683],
        "Toronto": [43.651070, -79.347015],
        "Singapore": [1.352083, 103.819836],
        "Hong Kong": [22.319309, 114.169361],
        "Seoul": [37.566536, 126.977966],
        "Mexico City": [19.432608, -99.133209],
        "Buenos Aires": [-34.603684, -58.381559],
        "Lagos": [6.524379, 3.379206],
        "Cairo": [30.044420, 31.235712],
        "Nairobi": [-1.286389, 36.817223],
        "Athens": [37.983810, 23.727539],
        "Madrid": [40.416775, -3.703790],
        "Lisbon": [38.7223, -9.1399],
        "Vienna": [48.208174, 16.373819],
        "Amsterdam": [52.3676, 4.9041],
        "Zurich": [47.376886, 8.541694],
        "Dublin": [53.3331, -6.2489],
        "Brussels": [50.8503, 4.3517],
        "Prague": [50.0755, 14.4378],
        "Budapest": [47.4979, 19.0402],
        "Warsaw": [52.2297, 21.0122],
        "Oslo": [59.9139, 10.7522],
        "Stockholm": [59.3293, 18.0686],
        "Helsinki": [60.1695, 24.9354],
        "Copenhagen": [55.6761, 12.5683],
        "Belgrade": [44.8176, 20.4633],
        "Sofia": [42.6977, 23.3219],
        "Bucharest": [44.4268, 26.1025],
        "Dubai Marina": [25.0800, 55.1378],
        "Jumeirah": [25.2232, 55.2784],
        "Deira": [25.2767, 55.2962],
        "Bur Dubai": [25.2581, 55.3047],
        "Al Barsha": [25.1042, 55.1860],
        "Business Bay": [25.1890, 55.2719],
        "Al Garhoud": [25.2465, 55.3341],
        "Al Qusais": [25.2784, 55.4209],
        "Al Satwa": [25.2428, 55.2833],
        "Cape Town": [-33.924870, 18.424055],
        "Hong Kong": [22.319309, 114.169361],
        "Shanghai": [31.230416, 121.473701],
        "Singapore": [1.352083, 103.819836],
        "Sydney": [-33.868820, 151.209296],
        "Auckland": [-36.848046, 174.763414],
        "Melbourne": [-37.813629, 144.963058],
        "Brisbane": [-27.469770, 153.025124],
        "Perth": [-31.950527, 115.860457],
        "Adelaide": [-34.928498, 138.600739],
        "Hobart": [-42.882688, 147.325135],
        "Wellington": [-41.286460, 174.776236],
        "Christchurch": [-43.532054, 172.636230],
        "Tasmania": [-42.8794, 147.3294],
        "Bali": [-8.340539, 115.091949],
        "Jakarta": [-6.2088, 106.8456],
        "Kuala Lumpur": [3.139, 101.6869],
        "Manila": [14.5995, 120.9842],
        "Ho Chi Minh City": [10.762622, 106.660172],
        "Hanoi": [21.0285, 105.8542],
        "Seoul": [37.5665, 126.978],
        "Busan": [35.1796, 129.0756],
        "Incheon": [37.4563, 126.7052],
        "Daegu": [35.8714, 128.6014],
        "Gwangju": [35.1595, 126.8526],
        "Ulsan": [35.5396, 129.3114],
        "Chengdu": [30.5728, 104.8800],
        "Guangzhou": [23.1291, 113.2644],
        "Shenzhen": [22.5431, 114.0579],
        "Xi'an": [34.3416, 108.9398],
        "Wuhan": [30.5928, 114.3055],
        "Nanjing": [32.0603, 118.7969],
        "Suzhou": [31.2989, 120.5853],
        "Hangzhou": [30.2741, 120.1551],
        "Qingdao": [36.0671, 120.3826],
        "Tianjin": [39.0851, 117.1994],
        "Shijiazhuang": [38.0419, 114.4794],
        "Harbin": [45.8038, 126.5343],
        "Dalian": [38.9140, 121.6147],
        "Zhengzhou": [34.7466, 113.6254],
        "Jinan": [36.6512, 116.9970],
        "Changsha": [28.2282, 112.9388],
        "Ningbo": [29.8683, 121.5440],
        "Xiamen": [24.4798, 118.0894],
        "Fuzhou": [26.0745, 119.2965],
        "Kunming": [25.0389, 102.7186],
        "Lijiang": [26.8752, 100.2358],
        "Sanya": [18.2528, 109.5110],
        "Sapporo": [43.0667, 141.3500],
        "Kyoto": [35.0116, 135.7681],
        "Osaka": [34.6937, 135.5023],
        "Nagoya": [35.1815, 136.9066],
        "Kobe": [34.6901, 135.1955],
        "Yokohama": [35.4437, 139.6371],
        "Fukuoka": [33.5902, 130.4017],
        "Sendai": [38.2682, 140.8694],
        "Kumamoto": [32.8031, 130.7079],
        "Hiroshima": [34.3853, 132.4553],
        "Nagasaki": [32.7503, 129.8777],
        "Okinawa": [26.2124, 127.6811],
        "Kagoshima": [31.5601, 130.5581],
        "Takamatsu": [34.3406, 134.0489],
        "Matsuyama": [33.8394, 132.7655],
        "Tottori": [35.5036, 134.2380],
        "Toyama": [36.6953, 137.2137],
        "Kanazawa": [36.5613, 136.6562],
        "Maebashi": [36.3914, 139.0606],
        "Utsunomiya": [36.5652, 139.8836],
        "Omiya": [35.9074, 139.6228],
        "Koshigaya": [35.8614, 139.7746],
        "Kawagoe": [35.9131, 139.4914],
        "Chigasaki": [35.3333, 139.3906],
        "Numazu": [35.1181, 138.8554],
        "Hamamatsu": [34.7107, 137.7260],
        "Yamagata": [38.2404, 140.3633],
        "Aomori": [40.8246, 140.7400],
        "Akita": [39.7192, 140.1024],
        "Iwate": [39.7036, 141.1527],
        "Morioka": [39.7036, 141.1527],
        "Fukushima": [37.7499, 140.4674],
        "Saitama": [35.8614, 139.6228],
        "Tachikawa": [35.7103, 139.4113],
        "Kunitachi": [35.7022, 139.4542],
        "Mitaka": [35.6985, 139.5533],
        "Kichijoji": [35.7074, 139.5895],
        "Shibuya": [35.6586, 139.7454],
        "Shinjuku": [35.6895, 139.6917],
        "Ikebukuro": [35.7335, 139.7103],
        "Asakusa": [35.7148, 139.7967],
        "Akihabara": [35.7023, 139.7745],
        "Roppongi": [35.6595, 139.7319],
        "Ginza": [35.6718, 139.7632],
        "Odaiba": [35.6275, 139.7767],
        "Tokyo Disney Resort": [35.6301, 139.8828],
        "Omiya": [35.9074, 139.6228],
        "Koshigaya": [35.8614, 139.7746],
        "Kawagoe": [35.9131, 139.4914],
        "Chigasaki": [35.3333, 139.3906],
        "Numazu": [35.1181, 138.8554],
        "Hamamatsu": [34.7107, 137.7260],
        "Yamagata": [38.2404, 140.3633],
        "Aomori": [40.8246, 140.7400],
        "Akita": [39.7192, 140.1024],
        "Iwate": [39.7036, 141.1527],
        "Morioka": [39.7036, 141.1527],
        "Fukushima": [37.7499, 140.4674],
        "Saitama": [35.8614, 139.6228],
        "Tachikawa": [35.7103, 139.4113],
        "Kunitachi": [35.7022, 139.4542],
        "Mitaka": [35.6985, 139.5533],
        "Kichijoji": [35.7074, 139.5895],
        "Shibuya": [35.6586, 139.7454],
        "Shinjuku": [35.6895, 139.6917],
        "Ikebukuro": [35.7335, 139.7103],
        "Asakusa": [35.7148, 139.7967],
        "Akihabara": [35.7023, 139.7745],
        "Roppongi": [35.6595, 139.7319],
        "Ginza": [35.6718, 139.7632],
        "Odaiba": [35.6275, 139.7767],
        "Tokyo Disney Resort": [35.6301, 139.8828],
        "Kyoto": [35.0116, 135.7681],
        "Osaka": [34.6937, 135.5023],
        "Nagoya": [35.1815, 136.9066],
        "Kobe": [34.6901, 135.1955],
        "Yokohama": [35.4437, 139.6371],
        "Fukuoka": [33.5902, 130.4017],
        "Sendai": [38.2682, 140.8694],
        "Kumamoto": [32.8031, 130.7079],
        "Hiroshima": [34.3853, 132.4553],
        "Nagasaki": [32.7503, 129.8777],
        "Okinawa": [26.2124, 127.6811],
        "Kagoshima": [31.5601, 130.5581],
        "Takamatsu": [34.3406, 134.0489],
        "Matsuyama": [33.8394, 132.7655],
        "Tottori": [35.5036, 134.2380],
        "Toyama": [36.6953, 137.2137],
        "Kanazawa": [36.5613, 136.6562],
        "Maebashi": [36.3914, 139.0606],
        "Utsunomiya": [36.5652, 139.8836],
        "Omiya": [35.9074, 139.6228],
        "Koshigaya": [35.8614, 139.7746],
        "Kawagoe": [35.9131, 139.4914],
        "Chigasaki": [35.3333, 139.3906],
        "Numazu": [35.1181, 138.8554],
        "Hamamatsu": [34.7107, 137.7260],
        "Yamagata": [38.2404, 140.3633],
        "Aomori": [40.8246, 140.7400],
        "Akita": [39.7192, 140.1024],
        "Iwate": [39.7036, 141.1527],
        "Morioka": [39.7036, 141.1527],
        "Fukushima": [37.7499, 140.4674],
        "Saitama": [35.8614, 139.6228],
        "Tachikawa": [35.7103, 139.4113],
        "Kunitachi": [35.7022, 139.4542],
        "Mitaka": [35.6985, 139.5533],
        "Kichijoji": [35.7074, 139.5895],
        "Shibuya": [35.6586, 139.7454],
        "Shinjuku": [35.6895, 139.6917],
        "Ikebukuro": [35.7335, 139.7103],
        "Asakusa": [35.7148, 139.7967],
        "Akihabara": [35.7023, 139.7745],
        "Roppongi": [35.6595, 139.7319],
        "Ginza": [35.6718, 139.7632],
        "Odaiba": [35.6275, 139.7767],
        "Tokyo Disney Resort": [35.6301, 139.8828],
    "Bangalore": [12.971599, 77.594566],
"Chennai": [13.082680, 80.270718],
"Hyderabad": [17.385044, 78.486671],
"Coimbatore": [11.016844, 76.955832],
"Madurai": [9.925201, 78.119775],
"Visakhapatnam": [17.686815, 83.218481],
"Kochi": [9.931233, 76.267303],
"Kozhikode": [11.258753, 75.780410],
"Mangalore": [12.914142, 74.856018],
"Salem": [11.664325, 78.146038],
"Nagercoil": [8.179220, 77.434782],
"Tirunelveli": [8.710144, 77.759777],
"Tirupati": [13.628804, 79.419236],
"Bhubaneswar": [20.296059, 85.818959],
"Kannur": [11.868702, 75.370367],
"Alappuzha": [9.498121, 76.338413],
"Thiruvananthapuram": [8.524139, 76.936638],
"Kollam": [8.891964, 76.634174],
"Palakkad": [10.7765, 76.6542],
"Kumbakonam": [10.9663, 79.3810],
"Erode": [11.3411, 77.7172],
"Ooty": [11.4094, 76.6968],
"Karur": [10.9554, 78.0785],
"Dindigul": [10.3611, 77.9783],
"Tiruchengode": [11.3932, 77.7596],
"Nellore": [14.4416, 79.9864],
"Rajahmundry": [17.0027, 81.7706],
"Guntur": [16.3068, 80.4366],
"Vijayawada": [16.5067, 80.6480],
"Warangal": [17.9784, 79.5941],
"Khammam": [17.2474, 80.1500],
"Kakinada": [16.9300, 82.0020],
"Eluru": [16.7105, 81.0976],
"Srikakulam": [18.3000, 83.9000],
"Tiruvalla": [9.3886, 76.5630],
"Pathanamthitta": [9.2667, 76.7833],
"Wayanad": [11.7160, 76.0594],
"Kasaragod": [12.4985, 74.9961],
"Chidambaram": [11.3944, 79.6921],
"Cuddalore": [11.7470, 79.7610],
"Tiruchirapalli": [10.805080, 78.685425],
"Kumbakonam": [10.9663, 79.3810],
"Tanjore": [10.7905, 79.1393],
"Nagapattinam": [10.7640, 79.8304],
"Ramanathapuram": [9.3585, 78.7781],
"Karaikal": [10.9236, 79.8324],
"Vellore": [12.9165, 79.1323],
"Hosur": [12.7310, 77.8259],
"Bangalore Rural": [13.1532, 77.3376],
"Chittoor": [13.2102, 79.1628],
"Kadapa": [14.4782, 78.8233],
"Bellary": [15.1390, 76.9154],
"Bagalkot": [16.1810, 75.6982],
"Bijapur": [16.8252, 76.9135],
"Hubli": [15.3619, 75.1240],
"Gadag": [15.3470, 75.6418],
"Shimoga": [13.9310, 75.5600],
"Chikmagalur": [13.3190, 75.7802],
"Udupi": [13.3411, 74.7495],
"Mysore": [12.2958, 76.6394],
"Channarayapatna": [12.8477, 76.3462],
"Hassan": [13.0032, 76.0978],
"Mandya": [12.5211, 76.8918],
"Kolar": [13.1261, 78.0049],
"Tumkur": [13.3407, 77.1014],
"Yadgir": [16.7804, 77.1354],
"Raichur": [16.2108, 77.3550],
"Bagalkot": [16.1810, 75.6982],
"Koppal": [15.3451, 76.0232],
"Nashik": [20.0118, 73.7908],
"Pune": [18.5204, 73.8567],
"Aurangabad": [19.8762, 75.3433],
"Jalgaon": [21.0094, 75.5604],
"Nanded": [19.1647, 77.2894],
"Solapur": [17.6599, 75.9064],
"Kolhapur": [16.7056, 74.2196],
"Satara": [17.6860, 73.8567],
"Chandrapur": [19.9465, 79.2940],
"Amravati": [20.9333, 77.7833],
"Nagpur": [21.1458, 79.0882],
"Jalna": [19.8406, 75.8834],
"Bidar": [17.9140, 77.5273],
"Gulbarga": [17.3292, 76.8318],
"Raichur": [16.2108, 77.3550],
"Belgaum": [15.8497, 74.4977],
"Bagalkot": [16.1810, 75.6982],
"Haveri": [14.8073, 75.4238],
"Dharwad": [15.4580, 75.0173],
"Kolar": [13.1261, 78.0049],
"Vijayanagara": [15.1600, 76.4700],
"Tirupati": [13.628804, 79.419236],
"Chennai": [13.082680, 80.270718],
"Bangalore": [12.971599, 77.594566],
"Hyderabad": [17.385044, 78.486671],
"Coimbatore": [11.016844, 76.955832],
"Madurai": [9.925201, 78.119775],
"Visakhapatnam": [17.686815, 83.218481],
"Kochi": [9.931233, 76.267303],
"Kozhikode": [11.258753, 75.780410],
"Mangalore": [12.914142, 74.856018],
"Salem": [11.664325, 78.146038],
"Nagercoil": [8.179220, 77.434782],
"Tirunelveli": [8.710144, 77.759777],
"Tirupati": [13.628804, 79.419236],
"Bhubaneswar": [20.296059, 85.818959],
"Kannur": [11.868702, 75.370367],
"Alappuzha": [9.498121, 76.338413],
"Thiruvananthapuram": [8.524139, 76.936638],
"Kollam": [8.891964, 76.634174],
"Palakkad": [10.7765, 76.6542],
"Kumbakonam": [10.9663, 79.3810],
"Erode": [11.3411, 77.7172],
"Ooty": [11.4094, 76.6968],
"Karur": [10.9554, 78.0785],
"Dindigul": [10.3611, 77.9783],
"Tiruchengode": [11.3932, 77.7596],
"Nellore": [14.4416, 79.9864],
"Rajahmundry": [17.0027, 81.7706],
"Guntur": [16.3068, 80.4366],
"Vijayawada": [16.5067, 80.6480],
"Warangal": [17.9784, 79.5941],
"Khammam": [17.2474, 80.1500],
"Kakinada": [16.9300, 82.0020],
"Eluru": [16.7105, 81.0976],
"Srikakulam": [18.3000, 83.9000],
"Tiruvalla": [9.3886, 76.5630],
"Pathanamthitta": [9.2667, 76.7833],
"Wayanad": [11.7160, 76.0594],
"Kasaragod": [12.4985, 74.9961],
"Chidambaram": [11.3944, 79.6921],
"Cuddalore": [11.7470, 79.7610],
"Tiruchirapalli": [10.805080, 78.685425],
"Kumbakonam": [10.9663, 79.3810],
"Tanjore": [10.7905, 79.1393],
"Nagapattinam": [10.7640, 79.8304],
"Ramanathapuram": [9.3585, 78.7781],
"Karaikal": [10.9236, 79.8324],
"Vellore": [12.9165, 79.1323],
"Hosur": [12.7310, 77.8259],
"Bangalore Rural": [13.1532, 77.3376],
"Chittoor": [13.2102, 79.1628],
"Kadapa": [14.4782, 78.8233],
"Bellary": [15.1390, 76.9154],
"Bagalkot": [16.1810, 75.6982],
"Bijapur": [16.8252, 76.9135],
"Hubli": [15.3619, 75.1240],
"Gadag": [15.3470, 75.6418],
"Shimoga": [13.9310, 75.5600],
"Chikmagalur": [13.3190, 75.7802],
"Udupi": [13.3411, 74.7495],
"Mysore": [12.2958, 76.6394],
"Channarayapatna": [12.8477, 76.3462],
"Hassan": [13.0032, 76.0978],
"Mandya": [12.5211, 76.8918],
"Kolar": [13.1261, 78.0049],
"Tumkur": [13.3407, 77.1014],
"Yadgir": [16.7804, 77.1354],
"Raichur": [16.2108, 77.3550],
"Bagalkot": [16.1810, 75.6982],
"Koppal": [15.3451, 76.0232],
"Nashik": [20.0118, 73.7908],
"Pune": [18.5204, 73.8567],
"Aurangabad": [19.8762, 75.3433],
"Jalgaon": [21.0094, 75.5604],
"Nanded": [19.1647, 77.2894],
"Solapur": [17.6599, 75.9064],
"Kolhapur": [16.7056, 74.2196],
"Satara": [17.6860, 73.8567],
"Chandrapur": [19.9465, 79.2940],
"Amravati": [20.9333, 77.7833],
"Nagpur": [21.1458, 79.0882],
"Jalna": [19.8406, 75.8834],
"Bidar": [17.9140, 77.5273],
"Gulbarga": [17.3292, 76.8318],
"Raichur": [16.2108, 77.3550],
"Belgaum": [15.8497, 74.4977],
"Bagalkot": [16.1810, 75.6982],
"Haveri": [14.8073, 75.4238],
"Dharwad": [15.4580, 75.0173],
"Kolar": [13.1261, 78.0049],
"Vijayanagara": [15.1600, 76.4700],
"Abu Dhabi": [24.4539, 54.3773],
"Dubai": [25.276987, 55.296249],
"Sharjah": [25.346255, 55.420932],
"Ajman": [25.4052, 55.5136],
"Ras Al Khaimah": [25.7967, 55.9762],
"Fujairah": [25.1294, 56.3318],
"Umm Al-Quwain": [25.5553, 55.6712],
"Al Ain": [24.2075, 55.7484],
"Al Dhafra": [24.4620, 54.4920],
"Jumeirah": [25.2201, 55.2750],
"Downtown Dubai": [25.1972, 55.2744],
"Bur Dubai": [25.2617, 55.2962],
"Deira": [25.2734, 55.3075],
"Dubai Marina": [25.0806, 54.9430],
"Palm Jumeirah": [25.1126, 55.1384],
"Dubai Sports City": [25.0045, 55.2130],
"Business Bay": [25.1914, 55.2694],
"Dubai Creek": [25.2716, 55.3088],
"Al Barsha": [25.0922, 55.1633],
"Al Safa": [25.1902, 55.2713],
"Al Qusais": [25.2723, 55.3822],
"Al Garhoud": [25.2428, 55.3594],
"Al Jaddaf": [25.2360, 55.3418],
"Al Khawaneej": [25.2305, 55.4117],
"Al Muraqqabat": [25.2744, 55.3186],
"Al Mina": [25.2634, 55.3098],
"Jebel Ali": [24.9834, 54.7155],
"Al Hudaiba": [25.2612, 55.3054],
"Al Tawar": [25.2776, 55.4053],
"Al Ras": [25.2704, 55.3075],
"Al Satwa": [25.2448, 55.2851],
"Al Muhaisnah": [25.2530, 55.3857],
"Dubai Investment Park": [24.9788, 54.9842],
"Al Sufouh": [25.1037, 55.1944],
"International City": [25.1874, 55.3543],
"Al Shamkha": [24.4334, 54.8833],
"Al Reem Island": [24.5059, 54.4206],
"Al Zahiyah": [24.4588, 54.3684],
"Al Bateen": [24.4734, 54.3916],
"Al Maqta": [24.4608, 54.4115],
"Al Aman": [24.4624, 54.3705],
"Al Nasser": [24.4661, 54.3774],
"Al Karama": [25.2592, 55.3097],
"Al Wathba": [24.3576, 54.6288],
"Al Mariah Island": [24.4644, 54.3705],
"Al Mushrif": [24.4573, 54.3686],
"Al Qattara": [24.2196, 55.7655],
"Al Tahrir": [24.4858, 54.3665],
"Al Jimi": [24.2064, 55.7554],
"Al Hili": [24.2007, 55.7732],
"Al Nahda": [25.3038, 55.3772],
"Al Majaz": [25.3254, 55.3890],
"Al Gharb": [25.3574, 55.3907],
"Al Qasimiah": [25.3464, 55.3980],
"Al Sharq": [25.3669, 55.4028],
"Al Seneyat": [25.3054, 55.4096],
"Al Jazeera": [25.3331, 55.3712],
"Tugariet Muwaileh": [25.3001, 55.4494],
"Al Riqah": [25.3704, 55.4359],
"Halwan": [25.3476, 55.4208],
"Al Hyrah": [25.3840, 55.4189],
"Mughaider": [25.3338, 55.4444],
"Wasit": [25.3559, 55.4615],
"Muwailah": [25.2916, 55.5092],
"Al Sajaah": [25.3260, 55.6454],
"Al Ruqa Al Hamra": [25.3403, 55.5144],
"University City": [25.2998, 55.4837],
"Rahmaniyah": [25.3376, 55.5800],
"Basaten Al Zubair": [25.3828, 55.6180],
"Khalid Sea Port": [25.3610, 55.3777],
"Al Siyuh": [25.2448, 55.6190],
"Al Zubair": [25.3754, 55.6855],
"Kaya Masaar": [25.2676, 55.6412],
"Al Jlail": [25.3376, 55.4482],
"Al Batayih": [25.2076, 55.7324],
"Jweza": [25.2729, 55.6079],
"Mehathab": [25.4047, 55.6424],
"Al Tayy": [25.2418, 55.5827],
"Al Sidairah": [25.3512, 55.6914],
"Al Barsha South": [25.0943, 55.1860],
"Al Barsha Heights": [25.1060, 55.1675],
"Dubai Silicon Oasis": [25.1120, 55.3845],
"Jumeirah Village Circle": [25.0605, 55.2074],
"Jumeirah Village Triangle": [25.0615, 55.2168],
"Dubai Sports City": [25.0045, 55.2130],
"Motor City": [25.0535, 55.2921],
"Dubai Hills Estate": [25.1164, 55.2261],
"City Walk": [25.2294, 55.2780],
"The Greens": [25.0993, 55.1717],
"The Views": [25.0875, 55.1798],
"The Lakes": [25.0684, 55.2017],
"Al Ghusais": [25.2656, 55.4095],
"Al Quoz": [25.1185, 55.2295],
"Al Garhoud": [25.2428, 55.3594],
"Al Khaleej Village": [25.2432, 55.3347],
"Al Nadd": [25.2760, 55.3090],
"Al Safa": [25.1903, 55.2705],
"Al Rashidiya": [25.2610, 55.3817],
"Al Murjan": [25.2744, 55.3066],
"Al Jaddaf": [25.2358, 55.3401],
"Al Wadi": [25.2622, 55.3185],
"Al Saada": [25.2786, 55.3443],
"Al Reem": [24.4966, 54.4258],
"Al Ameerpet": [25.2271, 55.2871],
"Al Zahiya": [24.4592, 54.3714],
"Al Muroor": [24.4538, 54.3672],
"Al Mina": [25.2632, 55.3092],
"Al Musalla": [25.2738, 55.3198],
"Al Naemiyah": [25.3618, 55.4571],
"Ajman City Center": [25.4061, 55.5110],
"Al Nuaimia": [25.3717, 55.4642],
"Al Rashidiya": [25.3963, 55.4452],
"Al Mowaihat": [25.3793, 55.4733],
"Al Jurf": [25.4014, 55.4872],
"Al Manama": [25.3893, 55.5114],
"Al Rawda": [25.3712, 55.4579],
"Al Humaidiya": [25.3784, 55.4825],
"Al Zahra": [25.3625, 55.4489],
"Al Raqaib": [25.3840, 55.4848],
"Al Khor": [25.3886, 55.4973],
"Al Hamidiya": [25.3797, 55.4861],
"Al Sawan": [25.3874, 55.5105],
"Al Jazeera": [25.3807, 55.5054],
"Al Yasmin": [25.3781, 55.4730],
"Al Rifa": [25.3658, 55.4597],
"Al Karama": [25.3699, 55.4716],
"Al Tawan": [25.3778, 55.4932],
"Al Saja": [25.3932, 55.4853],
"Al Jurf Industrial": [25.3974, 55.4838],
"Al Barsha": [25.3755, 55.4746],
'Al Nahda': [25.303810, 55.377176],
'Al Majaz': [25.325366, 55.388962],
'Al Gharb': [25.357424, 55.390659],
'Al Qasimiah': [25.346412, 55.397981],
'Al Sharq': [25.366859, 55.402760],
'Al Seneyat': [25.305378, 55.409551],
'Al Jazeera': [25.3331, 55.3712],
'Tugariet Muwaileh': [25.300143, 55.449436],
'Al Riqah': [25.370377, 55.435854],
'Halwan': [25.347588, 55.420762],
'Al Hyrah': [25.383965, 55.418875],
'Mughaider': [25.333775, 55.444415],
'Wasit': [25.355857, 55.461474],
'Muwailah': [25.291568, 55.509201],
'Al Sajaah': [25.325954, 55.645404],
'Al Ruqa Al Hamra': [25.340257, 55.514411],
'University City': [25.299825, 55.483680],
'Rahmaniyah': [25.337645, 55.580006],
'Basaten Al Zubair': [25.382798, 55.618032],
'Khalid Sea Port': [25.360974, 55.377697],
'Al Siyuh': [25.244771, 55.619020],
'Al Zubair': [25.375363, 55.685522],
'Kaya Masaar': [25.2676, 55.6412],
'Al Jlail': [25.337645, 55.448205],
'Al Batayih': [25.207617, 55.732370],
'Jweza': [25.2729, 55.6079],
'Mehathab': [25.4047, 55.6424],
'Al Tayy': [25.241847, 55.582719],
'Al Sidairah': [25.351180, 55.691388]            
    

};

    // Function to generate a random crime score
    function randomScore() {
        return Math.floor(Math.random() * 5) + 1;
    }

    // Function to get color based on the crime score
    function getColorForScore(score) {
        switch (score) {
            case 1: return 'green';
            case 2: return 'lightgreen';
            case 3: return 'yellow';
            case 4: return 'orange';
            case 5: return 'red';
            default: return 'grey';
        }
    }

    // Add neighborhood markers
    Object.entries(neighborhoods).forEach(([name, [lat, lng]]) => {
        L.marker([lat, lng], {
            icon: L.divIcon({
                className: 'neighborhood-marker',
                html: `<div style="background-color: ${getColorForScore(randomScore())};">${name}</div>`
            })
        }).addTo(map).on('click', () => {
            alert(`${name}: Crime Score ${randomScore()}`);
        });
    });

    // Add crime data
    const crimeData = [
        { type: 'Theft', time: '2:30 PM', lat: 25.3266, lng: 55.3854 },
        { type: 'Vandalism', time: '11:45 AM', lat: 25.3270, lng: 55.3850 },
        { type: 'Disturbance', time: '9:15 AM', lat: 25.3260, lng: 55.3860 }
    ];

    const crimeList = document.getElementById('crime-list');
    crimeData.forEach(crime => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${crime.type}</strong> - ${crime.time}`;
        crimeList.appendChild(li);
    });

    // Handle search suggestions
    const suggestionsList = document.getElementById('suggestions');
    
    function displaySuggestions(query) {
        suggestionsList.innerHTML = '';
        const matchedNeighborhoods = Object.keys(neighborhoods).filter(name => name.toLowerCase().includes(query));
        
        if (matchedNeighborhoods.length > 0) {
            matchedNeighborhoods.forEach(name => {
                const li = document.createElement('li');
                li.textContent = name;
                li.addEventListener('click', () => {
                    document.getElementById('search').value = name;
                    suggestionsList.innerHTML = ''; // Clear suggestions
                    handleSearch(name);
                });
                suggestionsList.appendChild(li);
            });
        }
    }

    document.getElementById('search').addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        if (query) {
            displaySuggestions(query);
        } else {
            suggestionsList.innerHTML = ''; // Clear suggestions when input is empty
        }
    });

    document.getElementById('search').addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const query = event.target.value.toLowerCase();
            const neighborhood = Object.keys(neighborhoods).find(name => name.toLowerCase() === query);
            if (neighborhood) {
                handleSearch(neighborhood);
            } else {
                alert('Neighborhood not found.');
            }
        }
    });

    function handleSearch(neighborhood) {
        const [lat, lng] = neighborhoods[neighborhood];
        map.setView([lat, lng], 14);
        L.marker([lat, lng], {
            icon: L.icon({ iconUrl: 'mr.png', iconSize: [40, 40] })
        }).addTo(map);
    }

    // Handle get directions button
    document.getElementById('get-directions').addEventListener('click', () => {
        const searchInput = document.getElementById('search').value.toLowerCase();
        const destination = Object.keys(neighborhoods).find(name => name.toLowerCase() === searchInput);

        if (destination) {
            const [destLat, destLng] = neighborhoods[destination];
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords;

                    // Add routing control
                    const routeControl = L.Routing.control({
                        waypoints: [
                            L.latLng(latitude, longitude),
                            L.latLng(destLat, destLng)
                        ],
                        routeWhileDragging: true,
                        geocoder: L.Control.Geocoder.nominatim()
                    }).addTo(map);

                    // Get directions and provide voice feedback
                    routeControl.on('routesfound', (e) => {
                        const routes = e.routes;
                        const instructions = routes[0].instructions;

                        instructions.forEach(instruction => {
                            speak(instruction.text);
                        });
                    });

                }, () => {
                    alert('Unable to retrieve your location.');
                });
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        } else {
            alert('Destination not found.');
        }
    });

    // Handle emergency button
    document.getElementById('emergency').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;

                // Show red marker at user's location
                L.marker([latitude, longitude], {
                    icon: L.icon({
                        iconUrl: 'mr.png', // Red emergency icon
                        iconSize: [50, 50]
                    })
                }).addTo(map);

                alert('Authorities have been alerted and are arriving');

            }, () => {
                alert('Unable to retrieve your location.');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });
});
