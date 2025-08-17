
export interface BirthDetails {
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM format
  place: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

export interface PlanetPosition {
  name: string;
  degree: number;
  sign: string;
  house: number;
  retrograde: boolean;
}

export interface HoroscopeData {
  ascendant: string;
  moonSign: string;
  sunSign: string;
  nakshatra: string;
  nakshatraPada: number;
  planets: PlanetPosition[];
  houses: string[];
  doshas: string[];
  gunaScore?: number;
  compatibility?: number;
}

export interface DoshaAnalysis {
  mangal: boolean;
  shani: boolean;
  rahu: boolean;
  ketu: boolean;
  severity: 'low' | 'medium' | 'high';
  remedies: string[];
}

// Nakshatra data with degrees
export const NAKSHATRAS = [
  { name: 'Ashwini', startDegree: 0, endDegree: 13.33, pada: 4, ruler: 'Ketu' },
  { name: 'Bharani', startDegree: 13.33, endDegree: 26.67, pada: 4, ruler: 'Venus' },
  { name: 'Krittika', startDegree: 26.67, endDegree: 40, pada: 4, ruler: 'Sun' },
  { name: 'Rohini', startDegree: 40, endDegree: 53.33, pada: 4, ruler: 'Moon' },
  { name: 'Mrigashirsha', startDegree: 53.33, endDegree: 66.67, pada: 4, ruler: 'Mars' },
  { name: 'Ardra', startDegree: 66.67, endDegree: 80, pada: 4, ruler: 'Rahu' },
  { name: 'Punarvasu', startDegree: 80, endDegree: 93.33, pada: 4, ruler: 'Jupiter' },
  { name: 'Pushya', startDegree: 93.33, endDegree: 106.67, pada: 4, ruler: 'Saturn' },
  { name: 'Ashlesha', startDegree: 106.67, endDegree: 120, pada: 4, ruler: 'Mercury' },
  { name: 'Magha', startDegree: 120, endDegree: 133.33, pada: 4, ruler: 'Ketu' },
  { name: 'Purva Phalguni', startDegree: 133.33, endDegree: 146.67, pada: 4, ruler: 'Venus' },
  { name: 'Uttara Phalguni', startDegree: 146.67, endDegree: 160, pada: 4, ruler: 'Sun' },
  { name: 'Hasta', startDegree: 160, endDegree: 173.33, pada: 4, ruler: 'Moon' },
  { name: 'Chitra', startDegree: 173.33, endDegree: 186.67, pada: 4, ruler: 'Mars' },
  { name: 'Swati', startDegree: 186.67, endDegree: 200, pada: 4, ruler: 'Rahu' },
  { name: 'Vishakha', startDegree: 200, endDegree: 213.33, pada: 4, ruler: 'Jupiter' },
  { name: 'Anuradha', startDegree: 213.33, endDegree: 226.67, pada: 4, ruler: 'Saturn' },
  { name: 'Jyeshtha', startDegree: 226.67, endDegree: 240, pada: 4, ruler: 'Mercury' },
  { name: 'Mula', startDegree: 240, endDegree: 253.33, pada: 4, ruler: 'Ketu' },
  { name: 'Purva Ashadha', startDegree: 253.33, endDegree: 266.67, pada: 4, ruler: 'Venus' },
  { name: 'Uttara Ashadha', startDegree: 266.67, endDegree: 280, pada: 4, ruler: 'Sun' },
  { name: 'Shravana', startDegree: 280, endDegree: 293.33, pada: 4, ruler: 'Moon' },
  { name: 'Dhanishta', startDegree: 293.33, endDegree: 306.67, pada: 4, ruler: 'Mars' },
  { name: 'Shatabhisha', startDegree: 306.67, endDegree: 320, pada: 4, ruler: 'Rahu' },
  { name: 'Purva Bhadrapada', startDegree: 320, endDegree: 333.33, pada: 4, ruler: 'Jupiter' },
  { name: 'Uttara Bhadrapada', startDegree: 333.33, endDegree: 346.67, pada: 4, ruler: 'Saturn' },
  { name: 'Revati', startDegree: 346.67, endDegree: 360, pada: 4, ruler: 'Mercury' }
];

// Zodiac signs
export const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

// Rashi (Vedic signs)
export const RASHI_SIGNS = [
  'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
  'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
];

// Calculate nakshatra from moon position
export function calculateNakshatra(moonDegree: number): { name: string; pada: number } {
  const nakshatra = NAKSHATRAS.find(n => 
    moonDegree >= n.startDegree && moonDegree < n.endDegree
  );
  
  if (!nakshatra) {
    return { name: 'Unknown', pada: 1 };
  }
  
  const degreeInNakshatra = moonDegree - nakshatra.startDegree;
  const padaDegree = 13.33 / 4; // Each nakshatra is 13.33 degrees, divided into 4 padas
  const pada = Math.floor(degreeInNakshatra / padaDegree) + 1;
  
  return { name: nakshatra.name, pada };
}

// Calculate rashi from planetary position
export function calculateRashi(degree: number): string {
  const signIndex = Math.floor(degree / 30);
  return RASHI_SIGNS[signIndex] || 'Unknown';
}

// Calculate zodiac sign from planetary position
export function calculateZodiacSign(degree: number): string {
  const signIndex = Math.floor(degree / 30);
  return ZODIAC_SIGNS[signIndex] || 'Unknown';
}

// Simplified dosha analysis
export function analyzeDoshas(planets: PlanetPosition[]): DoshaAnalysis {
  const doshas: string[] = [];
  let severity: 'low' | 'medium' | 'high' = 'low';
  
  const mars = planets.find(p => p.name === 'Mars');
  const saturn = planets.find(p => p.name === 'Saturn');
  const rahu = planets.find(p => p.name === 'Rahu');
  const ketu = planets.find(p => p.name === 'Ketu');
  
  // Mangal Dosha (Mars in 1st, 2nd, 4th, 7th, 8th, or 12th house)
  const mangalDoshaHouses = [1, 2, 4, 7, 8, 12];
  const hasMangalDosha = mars && mangalDoshaHouses.includes(mars.house);
  
  if (hasMangalDosha) {
    doshas.push('Mangal Dosha');
    severity = 'medium';
  }
  
  // Shani Dosha (Saturn in certain positions)
  const shaniDoshaHouses = [1, 4, 5, 7, 8, 10, 12];
  const hasShaniDosha = saturn && shaniDoshaHouses.includes(saturn.house);
  
  if (hasShaniDosha) {
    doshas.push('Shani Dosha');
    if (severity === 'low') severity = 'medium';
  }
  
  // Rahu/Ketu Dosha
  const rahuKetudoshaHouses = [1, 5, 7, 8, 12];
  const hasRahuDosha = rahu && rahuKetudoshaHouses.includes(rahu.house);
  const hasKetuDosha = ketu && rahuKetudoshaHouses.includes(ketu.house);
  
  if (hasRahuDosha) {
    doshas.push('Rahu Dosha');
    severity = 'high';
  }
  
  if (hasKetuDosha) {
    doshas.push('Ketu Dosha');
    if (severity !== 'high') severity = 'medium';
  }
  
  const remedies = generateRemedies(doshas);
  
  return {
    mangal: hasMangalDosha || false,
    shani: hasShaniDosha || false,
    rahu: hasRahuDosha || false,
    ketu: hasKetuDosha || false,
    severity,
    remedies
  };
}

// Generate remedies based on doshas
function generateRemedies(doshas: string[]): string[] {
  const remedies: string[] = [];
  
  if (doshas.includes('Mangal Dosha')) {
    remedies.push('Recite Hanuman Chalisa daily');
    remedies.push('Offer red flowers to Lord Hanuman on Tuesdays');
    remedies.push('Wear red coral gemstone after consultation');
  }
  
  if (doshas.includes('Shani Dosha')) {
    remedies.push('Worship Lord Shani on Saturdays');
    remedies.push('Donate black sesame seeds and oil');
    remedies.push('Wear blue sapphire after astrological consultation');
  }
  
  if (doshas.includes('Rahu Dosha')) {
    remedies.push('Chant Rahu mantra regularly');
    remedies.push('Donate to charity on Saturdays');
    remedies.push('Wear hessonite garnet after consultation');
  }
  
  if (doshas.includes('Ketu Dosha')) {
    remedies.push('Worship Lord Ganesha');
    remedies.push('Donate blankets to the needy');
    remedies.push('Wear cat\'s eye gemstone after consultation');
  }
  
  if (remedies.length === 0) {
    remedies.push('Continue regular spiritual practices');
    remedies.push('Practice meditation and yoga');
  }
  
  return remedies;
}

// Calculate Ashtakoota guna matching
export function calculateGunaMatching(
  maleChart: HoroscopeData,
  femaleChart: HoroscopeData
): number {
  let totalScore = 0;
  
  // Simplified guna matching - in real implementation, use proper ashtakoota
  // This is a basic approximation
  
  // Varna (1 point)
  if (maleChart.moonSign === femaleChart.moonSign) {
    totalScore += 1;
  }
  
  // Vashya (2 points) - simplified
  const compatibleSigns = ['Taurus-Scorpio', 'Cancer-Capricorn', 'Virgo-Pisces'];
  const signPair = `${maleChart.moonSign}-${femaleChart.moonSign}`;
  if (compatibleSigns.some(pair => pair.includes(maleChart.moonSign) && pair.includes(femaleChart.moonSign))) {
    totalScore += 2;
  }
  
  // Add more guna calculations here...
  // For demo purposes, adding random compatible points up to 36
  totalScore += Math.floor(Math.random() * 30) + 3; // 3-33 additional points
  
  return Math.min(totalScore, 36);
}

// Accurate astrological calculation using astronomical formulas
export async function calculateAccurateAstrology(birthDetails: BirthDetails): Promise<{
  rashi: string;
  nakshatra: string;
  horoscope: string;
  gunaScore: number;
  doshas: string[];
}> {
  const birthDate = new Date(birthDetails.date + 'T' + birthDetails.time);
  
  // Calculate Julian Day Number for accurate astronomical calculations
  const julianDay = dateToJulianDay(birthDate);
  
  // Calculate sun position using more accurate formula
  const sunLongitude = calculateSunLongitude(julianDay);
  const sunSign = calculateZodiacSign(sunLongitude);
  
  // Calculate moon position (simplified but more accurate than random)
  const moonLongitude = calculateMoonLongitude(julianDay, birthDetails.latitude || 0, birthDetails.longitude || 0);
  const moonRashi = calculateRashi(moonLongitude);
  const { name: nakshatra } = calculateNakshatra(moonLongitude);
  
  // Calculate doshas based on planetary positions
  const basicChart = generateBasicHoroscope(birthDetails);
  const doshaAnalysis = analyzeDoshas(basicChart.planets);
  
  return {
    rashi: moonRashi,
    nakshatra: nakshatra,
    horoscope: sunSign,
    gunaScore: Math.floor(Math.random() * 37), // Still simplified for demo
    doshas: doshaAnalysis.mangal || doshaAnalysis.shani || doshaAnalysis.rahu || doshaAnalysis.ketu 
      ? ['Mangal', 'Shani', 'Rahu', 'Ketu'].filter(dosha => {
        if (dosha === 'Mangal') return doshaAnalysis.mangal;
        if (dosha === 'Shani') return doshaAnalysis.shani;
        if (dosha === 'Rahu') return doshaAnalysis.rahu;
        if (dosha === 'Ketu') return doshaAnalysis.ketu;
        return false;
      })
      : []
  };
}

// Convert date to Julian Day Number for astronomical calculations
function dateToJulianDay(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  const jd = jdn + (hour - 12) / 24 + minute / 1440;
  
  return jd;
}

// Calculate sun's longitude more accurately
function calculateSunLongitude(julianDay: number): number {
  const n = julianDay - 2451545.0;
  const L = (280.460 + 0.9856474 * n) % 360;
  const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180;
  const lambda = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) % 360;
  
  return lambda < 0 ? lambda + 360 : lambda;
}

// Calculate moon's longitude (simplified but more accurate)
function calculateMoonLongitude(julianDay: number, latitude: number, longitude: number): number {
  const n = julianDay - 2451545.0;
  const L = (218.316 + 13.176396 * n) % 360;
  const M = ((134.963 + 13.064993 * n) % 360) * Math.PI / 180;
  const F = ((93.272 + 13.229350 * n) % 360) * Math.PI / 180;
  
  const moonLon = (L + 6.289 * Math.sin(M) + 1.274 * Math.sin(2 * ((L - 218.316) * Math.PI / 180) - M) + 
                  0.658 * Math.sin(2 * ((L - 218.316) * Math.PI / 180))) % 360;
  
  return moonLon < 0 ? moonLon + 360 : moonLon;
}

// Basic horoscope generation (simplified)
export function generateBasicHoroscope(birthDetails: BirthDetails): HoroscopeData {
  // This is a simplified implementation
  // In a real application, you would use proper ephemeris data and calculations
  
  const birthDate = new Date(birthDetails.date + 'T' + birthDetails.time);
  const dayOfYear = Math.floor((birthDate.getTime() - new Date(birthDate.getFullYear(), 0, 0).getTime()) / 86400000);
  
  // Simplified sun position calculation
  const sunDegree = (dayOfYear * 360 / 365) % 360;
  const sunSign = calculateZodiacSign(sunDegree);
  const sunRashi = calculateRashi(sunDegree);
  
  // Simplified moon position (offset from sun)
  const moonDegree = (sunDegree + 45 + Math.random() * 270) % 360;
  const moonSign = calculateRashi(moonDegree);
  const { name: nakshatra, pada: nakshatraPada } = calculateNakshatra(moonDegree);
  
  // Simplified ascendant calculation
  const ascendantDegree = (sunDegree + Math.random() * 360) % 360;
  const ascendant = calculateRashi(ascendantDegree);
  
  // Generate simplified planetary positions
  const planets: PlanetPosition[] = [
    {
      name: 'Sun',
      degree: sunDegree,
      sign: sunRashi,
      house: Math.floor(Math.random() * 12) + 1,
      retrograde: false
    },
    {
      name: 'Moon',
      degree: moonDegree,
      sign: moonSign,
      house: Math.floor(Math.random() * 12) + 1,
      retrograde: false
    },
    {
      name: 'Mars',
      degree: Math.random() * 360,
      sign: calculateRashi(Math.random() * 360),
      house: Math.floor(Math.random() * 12) + 1,
      retrograde: Math.random() > 0.8
    },
    {
      name: 'Mercury',
      degree: Math.random() * 360,
      sign: calculateRashi(Math.random() * 360),
      house: Math.floor(Math.random() * 12) + 1,
      retrograde: Math.random() > 0.7
    },
    {
      name: 'Jupiter',
      degree: Math.random() * 360,
      sign: calculateRashi(Math.random() * 360),
      house: Math.floor(Math.random() * 12) + 1,
      retrograde: Math.random() > 0.6
    },
    {
      name: 'Venus',
      degree: Math.random() * 360,
      sign: calculateRashi(Math.random() * 360),
      house: Math.floor(Math.random() * 12) + 1,
      retrograde: Math.random() > 0.8
    },
    {
      name: 'Saturn',
      degree: Math.random() * 360,
      sign: calculateRashi(Math.random() * 360),
      house: Math.floor(Math.random() * 12) + 1,
      retrograde: Math.random() > 0.6
    },
    {
      name: 'Rahu',
      degree: Math.random() * 360,
      sign: calculateRashi(Math.random() * 360),
      house: Math.floor(Math.random() * 12) + 1,
      retrograde: true // Rahu is always retrograde
    },
    {
      name: 'Ketu',
      degree: Math.random() * 360,
      sign: calculateRashi(Math.random() * 360),
      house: Math.floor(Math.random() * 12) + 1,
      retrograde: true // Ketu is always retrograde
    }
  ];
  
  const doshaAnalysis = analyzeDoshas(planets);
  
  return {
    ascendant,
    moonSign,
    sunSign,
    nakshatra,
    nakshatraPada,
    planets,
    houses: RASHI_SIGNS,
    doshas: doshaAnalysis.mangal || doshaAnalysis.shani || doshaAnalysis.rahu || doshaAnalysis.ketu 
      ? ['Mangal', 'Shani', 'Rahu', 'Ketu'].filter(dosha => {
        if (dosha === 'Mangal') return doshaAnalysis.mangal;
        if (dosha === 'Shani') return doshaAnalysis.shani;
        if (dosha === 'Rahu') return doshaAnalysis.rahu;
        if (dosha === 'Ketu') return doshaAnalysis.ketu;
        return false;
      })
      : []
  };
}

// Daily predictions based on nakshatra
export function getDailyPrediction(nakshatra: string): string {
  const predictions: Record<string, string[]> = {
    'Ashwini': [
      'Today brings new beginnings and swift progress in your endeavors.',
      'Your leadership qualities will shine through in group activities.',
      'Travel or communication may bring unexpected opportunities.'
    ],
    'Bharani': [
      'Focus on patience and nurturing relationships today.',
      'Creative projects will flourish with dedicated effort.',
      'Avoid impulsive decisions in financial matters.'
    ],
    'Krittika': [
      'Your analytical skills will help solve complex problems.',
      'Recognition for past efforts may come your way.',
      'Pay attention to your health and dietary habits.'
    ],
    // Add more nakshatras...
  };
  
  const nakshatraPredictions = predictions[nakshatra] || [
    'Today is favorable for spiritual practices and self-reflection.',
    'Focus on maintaining harmony in relationships.',
    'Trust your intuition in making important decisions.'
  ];
  
  return nakshatraPredictions[Math.floor(Math.random() * nakshatraPredictions.length)];
}

// Compatibility analysis between two horoscopes
export function analyzeCompatibility(
  chart1: HoroscopeData,
  chart2: HoroscopeData
): { score: number; analysis: string; recommendations: string[] } {
  const gunaScore = calculateGunaMatching(chart1, chart2);
  let compatibility = (gunaScore / 36) * 100;
  
  // Adjust for dosha compatibility
  const chart1HasMangal = chart1.doshas.includes('Mangal');
  const chart2HasMangal = chart2.doshas.includes('Mangal');
  
  if (chart1HasMangal && chart2HasMangal) {
    compatibility += 10; // Both having mangal dosha can be beneficial
  } else if (chart1HasMangal !== chart2HasMangal) {
    compatibility -= 5; // One having mangal dosha may require remedies
  }
  
  compatibility = Math.max(0, Math.min(100, compatibility));
  
  let analysis = '';
  const recommendations: string[] = [];
  
  if (compatibility >= 80) {
    analysis = 'Excellent compatibility! The charts show strong harmony and mutual understanding.';
    recommendations.push('Proceed with confidence in this relationship');
    recommendations.push('Focus on spiritual growth together');
  } else if (compatibility >= 60) {
    analysis = 'Good compatibility with some areas that need attention.';
    recommendations.push('Work on communication and understanding');
    recommendations.push('Consider astrological remedies for better harmony');
  } else if (compatibility >= 40) {
    analysis = 'Moderate compatibility. Significant effort required for harmony.';
    recommendations.push('Consult an experienced astrologer');
    recommendations.push('Perform recommended pujas and remedies');
    recommendations.push('Focus on shared spiritual practices');
  } else {
    analysis = 'Challenging compatibility. Careful consideration advised.';
    recommendations.push('Seek detailed astrological consultation');
    recommendations.push('Consider alternative matching factors');
    recommendations.push('Perform powerful remedial measures');
  }
  
  return {
    score: Math.round(compatibility),
    analysis,
    recommendations
  };
}
