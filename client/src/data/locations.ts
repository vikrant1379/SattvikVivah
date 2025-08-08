
export const countries = [
  { value: "IN", label: "India" },
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
  { value: "NZ", label: "New Zealand" },
  { value: "SG", label: "Singapore" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "NL", label: "Netherlands" },
  { value: "SE", label: "Sweden" },
  { value: "CH", label: "Switzerland" },
  { value: "JP", label: "Japan" },
  { value: "MY", label: "Malaysia" },
  { value: "TH", label: "Thailand" },
  { value: "ZA", label: "South Africa" },
];

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh", 
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat", 
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab", 
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry"
];

export const statesByCountry: Record<string, string[]> = {
  IN: indianStates,
  US: [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming"
  ],
  CA: [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
    "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island",
    "Quebec", "Saskatchewan", "Yukon"
  ],
  GB: [
    "England", "Scotland", "Wales", "Northern Ireland"
  ],
  AU: [
    "Australian Capital Territory", "New South Wales", "Northern Territory", "Queensland",
    "South Australia", "Tasmania", "Victoria", "Western Australia"
  ]
};

export const majorCities: Record<string, string[]> = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davangere", "Shimoga"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore", "Erode"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Allahabad", "Bareilly", "Aligarh"],
  "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Habra"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Firozpur", "Hoshiarpur"],
  "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi", "North East Delhi"],
  
  // US Cities
  "California": ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Fresno", "Long Beach", "Oakland"],
  "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Mount Vernon"],
  "Texas": ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi"],
  "Florida": ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg", "Hialeah", "Tallahassee", "Fort Lauderdale"],
  
  // UK Cities
  "England": ["London", "Birmingham", "Manchester", "Liverpool", "Leeds", "Sheffield", "Bristol", "Newcastle"],
  "Scotland": ["Glasgow", "Edinburgh", "Aberdeen", "Dundee", "Stirling", "Perth", "Inverness", "Paisley"],
  "Wales": ["Cardiff", "Swansea", "Newport", "Wrexham", "Barry", "Caerphilly", "Rhondda", "Bridgend"],
  
  // Canada Cities
  "Ontario": ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Markham", "Vaughan"],
  "British Columbia": ["Vancouver", "Surrey", "Burnaby", "Richmond", "Abbotsford", "Coquitlam", "Kelowna", "Saanich"],
  "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Saguenay", "Trois-Rivières"],
  
  // Australia Cities
  "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Maitland", "Wagga Wagga", "Albury", "Port Macquarie"],
  "Victoria": ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Melton", "Latrobe", "Frankston", "Casey"],
  "Queensland": ["Brisbane", "Gold Coast", "Townsville", "Cairns", "Toowoomba", "Rockhampton", "Mackay", "Bundaberg"]
};

export const motherTongues = [
  "Hindi",
  "Bengali", 
  "Tamil",
  "Telugu",
  "Gujarati",
  "Marathi",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Oriya",
  "Assamese",
  "Urdu",
  "Sanskrit",
  "English",
  "Konkani",
  "Sindhi",
  "Nepali",
  "Bhojpuri",
  "Rajasthani",
  "Haryanvi"
];

export const spiritualPractices = [
  "Meditation & Dhyana",
  "Yoga & Pranayama",
  "Daily Puja & Worship",
  "Japa & Mantra Chanting",
  "Bhajan & Kirtan",
  "Vedic Study",
  "Satsang Participation",
  "Temple Seva",
  "Pilgrimage (Yatra)",
  "Fasting & Vrata",
  "Charity & Dana",
  "Karma Yoga",
  "Bhakti Practice",
  "Ayurvedic Lifestyle",
  "Vedic Astrology Study"
];
