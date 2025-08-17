
import { typedApiRequest } from './api-service';

export interface PlaceSearchResult {
  id: string;
  name: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface PlaceSearchRequest {
  query: string;
  limit?: number;
}

class PlacesService {
  
  // Search places using a free geocoding API
  async searchPlaces(query: string, limit: number = 10): Promise<PlaceSearchResult[]> {
    try {
      if (!query || query.length < 3) {
        return [];
      }

      // Using Nominatim (OpenStreetMap) free geocoding API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=${limit}&countrycodes=in&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'SattvikConnect/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch places');
      }

      const data = await response.json();
      
      return data.map((place: any) => ({
        id: place.place_id.toString(),
        name: place.display_name.split(',')[0],
        state: place.address?.state || '',
        country: place.address?.country || 'India',
        latitude: parseFloat(place.lat),
        longitude: parseFloat(place.lon),
        timezone: 'Asia/Kolkata' // Default for India
      }));
    } catch (error) {
      console.error('Error searching places:', error);
      // Fallback to local Indian cities if API fails
      return this.getFallbackPlaces(query);
    }
  }

  // Fallback places for common Indian cities
  private getFallbackPlaces(query: string): PlaceSearchResult[] {
    const commonPlaces = [
      { id: '1', name: 'Mumbai', state: 'Maharashtra', country: 'India', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata' },
      { id: '2', name: 'Delhi', state: 'Delhi', country: 'India', latitude: 28.7041, longitude: 77.1025, timezone: 'Asia/Kolkata' },
      { id: '3', name: 'Bangalore', state: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata' },
      { id: '4', name: 'Chennai', state: 'Tamil Nadu', country: 'India', latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata' },
      { id: '5', name: 'Kolkata', state: 'West Bengal', country: 'India', latitude: 22.5726, longitude: 88.3639, timezone: 'Asia/Kolkata' },
      { id: '6', name: 'Hyderabad', state: 'Telangana', country: 'India', latitude: 17.3850, longitude: 78.4867, timezone: 'Asia/Kolkata' },
      { id: '7', name: 'Pune', state: 'Maharashtra', country: 'India', latitude: 18.5204, longitude: 73.8567, timezone: 'Asia/Kolkata' },
      { id: '8', name: 'Ahmedabad', state: 'Gujarat', country: 'India', latitude: 23.0225, longitude: 72.5714, timezone: 'Asia/Kolkata' },
      { id: '9', name: 'Jaipur', state: 'Rajasthan', country: 'India', latitude: 26.9124, longitude: 75.7873, timezone: 'Asia/Kolkata' },
      { id: '10', name: 'Surat', state: 'Gujarat', country: 'India', latitude: 21.1702, longitude: 72.8311, timezone: 'Asia/Kolkata' }
    ];

    const lowerQuery = query.toLowerCase();
    return commonPlaces.filter(place => 
      place.name.toLowerCase().includes(lowerQuery) ||
      place.state.toLowerCase().includes(lowerQuery)
    );
  }

  // Get timezone for a location
  async getTimezone(latitude: number, longitude: number): Promise<string> {
    try {
      // For India, most places use Asia/Kolkata
      // In a real app, you might use a timezone API
      return 'Asia/Kolkata';
    } catch (error) {
      console.error('Error getting timezone:', error);
      return 'Asia/Kolkata';
    }
  }
}

export const placesService = new PlacesService();
