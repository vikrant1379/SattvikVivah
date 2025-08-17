
import { 
  BirthDetails, 
  HoroscopeData, 
  generateBasicHoroscope, 
  analyzeCompatibility,
  getDailyPrediction 
} from '../utils/vedic-astrology.utils';
import { typedApiRequest } from './api-service';

export interface KundliRequest {
  birthDetails: BirthDetails;
  includeRemedies?: boolean;
  includePredictions?: boolean;
}

export interface CompatibilityRequest {
  person1: BirthDetails;
  person2: BirthDetails;
}

export interface KundliResponse {
  horoscope: HoroscopeData;
  remedies?: string[];
  dailyPrediction?: string;
  gemstoneRecommendations?: string[];
  favorableDates?: string[];
}

export interface CompatibilityResponse {
  compatibility: {
    score: number;
    analysis: string;
    recommendations: string[];
  };
  detailedAnalysis: {
    gunaMatching: number;
    doshaCompatibility: string;
    planetaryHarmony: string;
    longevityFactor: string;
  };
}

class HoroscopeService {
  
  // Generate detailed kundli
  async generateKundli(request: KundliRequest): Promise<KundliResponse> {
    try {
      // For now, use local calculation
      // In production, you might call an external Vedic astrology API
      const horoscope = generateBasicHoroscope(request.birthDetails);
      
      const response: KundliResponse = {
        horoscope
      };
      
      if (request.includeRemedies) {
        response.remedies = this.generateRemedies(horoscope);
        response.gemstoneRecommendations = this.getGemstoneRecommendations(horoscope);
      }
      
      if (request.includePredictions) {
        response.dailyPrediction = getDailyPrediction(horoscope.nakshatra);
        response.favorableDates = this.getFavorableDates(horoscope);
      }
      
      return response;
    } catch (error) {
      console.error('Error generating kundli:', error);
      throw new Error('Failed to generate kundli. Please try again.');
    }
  }
  
  // Analyze compatibility between two persons
  async analyzeCompatibility(request: CompatibilityRequest): Promise<CompatibilityResponse> {
    try {
      const horoscope1 = generateBasicHoroscope(request.person1);
      const horoscope2 = generateBasicHoroscope(request.person2);
      
      const compatibility = analyzeCompatibility(horoscope1, horoscope2);
      
      return {
        compatibility,
        detailedAnalysis: {
          gunaMatching: horoscope1.gunaScore || 0,
          doshaCompatibility: this.getDoshaCompatibilityAnalysis(horoscope1, horoscope2),
          planetaryHarmony: this.getPlanetaryHarmonyAnalysis(horoscope1, horoscope2),
          longevityFactor: this.getLongevityAnalysis(horoscope1, horoscope2)
        }
      };
    } catch (error) {
      console.error('Error analyzing compatibility:', error);
      throw new Error('Failed to analyze compatibility. Please try again.');
    }
  }
  
  // Get daily horoscope
  async getDailyHoroscope(nakshatra: string): Promise<string> {
    return getDailyPrediction(nakshatra);
  }
  
  // Get auspicious times for today
  async getAuspiciousTimes(birthDetails: BirthDetails): Promise<{
    sunrise: string;
    sunset: string;
    rahuKaal: string;
    gulikaKaal: string;
    favorableHours: string[];
  }> {
    // Simplified calculation - in real app, use proper astronomical calculations
    return {
      sunrise: '06:00 AM',
      sunset: '06:30 PM',
      rahuKaal: '09:00 AM - 10:30 AM',
      gulikaKaal: '01:30 PM - 03:00 PM',
      favorableHours: ['06:00 AM - 08:00 AM', '11:00 AM - 01:00 PM', '04:00 PM - 06:00 PM']
    };
  }
  
  // Private helper methods
  private generateRemedies(horoscope: HoroscopeData): string[] {
    const remedies: string[] = [];
    
    // Based on sun sign
    const sunPlanet = horoscope.planets.find(p => p.name === 'Sun');
    if (sunPlanet) {
      remedies.push('Offer water to Sun during sunrise');
      remedies.push('Chant Gayatri Mantra daily');
    }
    
    // Based on moon sign (Rashi)
    switch (horoscope.moonSign) {
      case 'Mesha':
        remedies.push('Worship Lord Hanuman on Tuesdays');
        break;
      case 'Vrishabha':
        remedies.push('Offer white flowers to Goddess Lakshmi');
        break;
      case 'Mithuna':
        remedies.push('Recite Vishnu Sahasranama');
        break;
      // Add more cases...
      default:
        remedies.push('Practice regular meditation');
    }
    
    // Based on doshas
    if (horoscope.doshas.includes('Mangal')) {
      remedies.push('Fast on Tuesdays');
      remedies.push('Donate red lentils');
    }
    
    return remedies;
  }
  
  private getGemstoneRecommendations(horoscope: HoroscopeData): string[] {
    const gemstones: string[] = [];
    
    // Based on ascendant
    switch (horoscope.ascendant) {
      case 'Mesha':
        gemstones.push('Red Coral for Mars');
        break;
      case 'Vrishabha':
        gemstones.push('Diamond for Venus');
        break;
      case 'Mithuna':
        gemstones.push('Emerald for Mercury');
        break;
      case 'Karka':
        gemstones.push('Pearl for Moon');
        break;
      case 'Simha':
        gemstones.push('Ruby for Sun');
        break;
      case 'Kanya':
        gemstones.push('Emerald for Mercury');
        break;
      // Add more cases...
      default:
        gemstones.push('Consult astrologer for personalized recommendation');
    }
    
    return gemstones;
  }
  
  private getFavorableDates(horoscope: HoroscopeData): string[] {
    // Simplified - generate some favorable dates based on nakshatra
    const today = new Date();
    const favorableDates: string[] = [];
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Simple logic - every 3rd day is favorable
      if (i % 3 === 0) {
        favorableDates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return favorableDates.slice(0, 10); // Return 10 dates
  }
  
  private getDoshaCompatibilityAnalysis(horoscope1: HoroscopeData, horoscope2: HoroscopeData): string {
    const doshas1 = horoscope1.doshas;
    const doshas2 = horoscope2.doshas;
    
    if (doshas1.length === 0 && doshas2.length === 0) {
      return 'Excellent - No major doshas present in either chart';
    } else if (doshas1.includes('Mangal') && doshas2.includes('Mangal')) {
      return 'Good - Both have Mangal dosha, which cancels the negative effects';
    } else if (doshas1.length > 0 || doshas2.length > 0) {
      return 'Requires attention - Doshas present, remedial measures recommended';
    }
    
    return 'Moderate - Some astrological considerations needed';
  }
  
  private getPlanetaryHarmonyAnalysis(horoscope1: HoroscopeData, horoscope2: HoroscopeData): string {
    // Simplified analysis
    const favorablePlanets1 = horoscope1.planets.filter(p => !p.retrograde).length;
    const favorablePlanets2 = horoscope2.planets.filter(p => !p.retrograde).length;
    
    const harmonyScore = (favorablePlanets1 + favorablePlanets2) / 18; // Max 9 planets each
    
    if (harmonyScore > 0.7) {
      return 'Excellent planetary harmony - Strong mutual support';
    } else if (harmonyScore > 0.5) {
      return 'Good planetary harmony - Generally supportive energies';
    } else {
      return 'Challenging planetary harmony - Requires patience and understanding';
    }
  }
  
  private getLongevityAnalysis(horoscope1: HoroscopeData, horoscope2: HoroscopeData): string {
    // Simplified longevity analysis based on key house placements
    const beneficPlanets = ['Jupiter', 'Venus', 'Mercury'];
    
    const beneficCount1 = horoscope1.planets.filter(p => 
      beneficPlanets.includes(p.name) && [1, 4, 7, 10].includes(p.house)
    ).length;
    
    const beneficCount2 = horoscope2.planets.filter(p => 
      beneficPlanets.includes(p.name) && [1, 4, 7, 10].includes(p.house)
    ).length;
    
    const totalBenefic = beneficCount1 + beneficCount2;
    
    if (totalBenefic >= 4) {
      return 'Excellent - Strong indicators for long-lasting relationship';
    } else if (totalBenefic >= 2) {
      return 'Good - Positive indicators for relationship longevity';
    } else {
      return 'Moderate - Focus on building strong foundation';
    }
  }
}

export const horoscopeService = new HoroscopeService();
