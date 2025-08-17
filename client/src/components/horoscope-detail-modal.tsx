
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarDays, Clock, MapPin, Star, Heart, Shield, Gem } from 'lucide-react';
import { horoscopeService, KundliResponse } from '@/services/horoscope.service';
import { BirthDetails, HoroscopeData } from '@/utils/vedic-astrology.utils';

interface HoroscopeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId?: string;
  profileName?: string;
}

export const HoroscopeDetailModal: React.FC<HoroscopeDetailModalProps> = ({
  isOpen,
  onClose,
  profileId,
  profileName
}) => {
  const [birthDetails, setBirthDetails] = useState<BirthDetails>({
    date: '',
    time: '',
    place: ''
  });
  const [kundliData, setKundliData] = useState<KundliResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('input');

  const handleGenerateKundli = async () => {
    if (!birthDetails.date || !birthDetails.time || !birthDetails.place) {
      alert('Please fill in all birth details');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await horoscopeService.generateKundli({
        birthDetails,
        includeRemedies: true,
        includePredictions: true
      });
      setKundliData(response);
      setActiveTab('chart');
    } catch (error) {
      console.error('Error generating kundli:', error);
      alert('Failed to generate kundli. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderPlanetaryPositions = (horoscope: HoroscopeData) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {horoscope.planets.map((planet) => (
        <Card key={planet.name} className="p-3">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-sm">{planet.name}</h4>
              <p className="text-xs text-gray-600">{planet.sign}</p>
              <p className="text-xs text-gray-500">House {planet.house}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono">{planet.degree.toFixed(2)}°</p>
              {planet.retrograde && (
                <Badge variant="secondary" className="text-xs">R</Badge>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderBirthChart = (horoscope: HoroscopeData) => (
    <div className="space-y-6">
      {/* Chart Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Birth Chart Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-xs text-gray-500">Ascendant</Label>
              <p className="font-medium">{horoscope.ascendant}</p>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Moon Sign</Label>
              <p className="font-medium">{horoscope.moonSign}</p>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Sun Sign</Label>
              <p className="font-medium">{horoscope.sunSign}</p>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Nakshatra</Label>
              <p className="font-medium">{horoscope.nakshatra}</p>
              <p className="text-xs text-gray-500">Pada {horoscope.nakshatraPada}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simplified Birth Chart Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Birth Chart (Rashi Chart)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-1 w-64 h-64 mx-auto border-2 border-gray-300">
            {Array.from({ length: 12 }, (_, i) => (
              <div 
                key={i} 
                className="border border-gray-200 flex items-center justify-center text-xs font-medium bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="text-center">
                  <div className="text-xs text-gray-600">{i + 1}</div>
                  <div className="text-xs font-medium">{horoscope.houses[i % 12]}</div>
                  {/* Show planets in houses */}
                  {horoscope.planets
                    .filter(planet => planet.house === i + 1)
                    .slice(0, 2) // Show max 2 planets per house
                    .map(planet => (
                      <div key={planet.name} className="text-xs text-blue-600 font-bold">
                        {planet.name.charAt(0)}
                        {planet.retrograde && 'R'}
                      </div>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Houses are numbered 1-12. Planetary abbreviations: Su=Sun, Mo=Moon, Ma=Mars, Me=Mercury, Ju=Jupiter, Ve=Venus, Sa=Saturn, Ra=Rahu, Ke=Ketu
          </p>
        </CardContent>
      </Card>

      {/* Planetary Positions */}
      <Card>
        <CardHeader>
          <CardTitle>Planetary Positions</CardTitle>
        </CardHeader>
        <CardContent>
          {renderPlanetaryPositions(horoscope)}
        </CardContent>
      </Card>
    </div>
  );

  const renderDoshaAnalysis = (horoscope: HoroscopeData) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-500" />
          Dosha Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {horoscope.doshas.length > 0 ? (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {horoscope.doshas.map((dosha) => (
                <Badge key={dosha} variant="destructive">
                  {dosha} Dosha
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              The presence of doshas indicates certain planetary influences that may require attention. 
              Remedial measures are recommended to mitigate any negative effects.
            </p>
          </div>
        ) : (
          <div className="text-center py-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              No Major Doshas Detected
            </Badge>
            <p className="text-sm text-gray-600 mt-2">
              This is a favorable astrological configuration with no significant planetary afflictions.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Detailed Horoscope {profileName && `- ${profileName}`}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="input">Birth Details</TabsTrigger>
            <TabsTrigger value="chart" disabled={!kundliData}>Birth Chart</TabsTrigger>
            <TabsTrigger value="analysis" disabled={!kundliData}>Analysis</TabsTrigger>
            <TabsTrigger value="remedies" disabled={!kundliData}>Remedies</TabsTrigger>
            <TabsTrigger value="predictions" disabled={!kundliData}>Predictions</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[500px] mt-4">
            <TabsContent value="input" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5" />
                    Enter Birth Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="birth-date">Date of Birth</Label>
                    <Input
                      id="birth-date"
                      type="date"
                      value={birthDetails.date}
                      onChange={(e) => setBirthDetails(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="birth-time">Time of Birth</Label>
                    <Input
                      id="birth-time"
                      type="time"
                      value={birthDetails.time}
                      onChange={(e) => setBirthDetails(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="birth-place">Place of Birth</Label>
                    <Input
                      id="birth-place"
                      placeholder="City, State, Country"
                      value={birthDetails.place}
                      onChange={(e) => setBirthDetails(prev => ({ ...prev, place: e.target.value }))}
                    />
                  </div>

                  <Button 
                    onClick={handleGenerateKundli} 
                    disabled={isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? 'Generating Kundli...' : 'Generate Detailed Kundli'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chart">
              {kundliData && renderBirthChart(kundliData.horoscope)}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              {kundliData && (
                <>
                  {renderDoshaAnalysis(kundliData.horoscope)}
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-pink-500" />
                        Compatibility Factors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Guna Score Potential</Label>
                          <p className="text-sm text-gray-600">
                            Based on {kundliData.horoscope.nakshatra} nakshatra and {kundliData.horoscope.moonSign} moon sign, 
                            this profile shows good compatibility potential for Vedic matching.
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Mangal Dosha Status</Label>
                          <Badge variant={kundliData.horoscope.doshas.includes('Mangal') ? 'destructive' : 'secondary'}>
                            {kundliData.horoscope.doshas.includes('Mangal') ? 'Mangalik' : 'Non-Mangalik'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            <TabsContent value="remedies" className="space-y-4">
              {kundliData?.remedies && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-500" />
                      Remedial Measures
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {kundliData.remedies.map((remedy, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700">
                            {index + 1}
                          </div>
                          <p className="text-sm text-gray-700">{remedy}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {kundliData?.gemstoneRecommendations && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gem className="w-5 h-5 text-purple-500" />
                      Gemstone Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {kundliData.gemstoneRecommendations.map((gemstone, index) => (
                        <div key={index} className="p-2 bg-purple-50 rounded border-l-4 border-purple-200">
                          <p className="text-sm text-gray-700">{gemstone}</p>
                        </div>
                      ))}
                      <p className="text-xs text-gray-500 mt-3">
                        * Please consult a qualified astrologer before wearing any gemstone
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="predictions" className="space-y-4">
              {kundliData?.dailyPrediction && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-500" />
                      Daily Prediction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {kundliData.dailyPrediction}
                    </p>
                  </CardContent>
                </Card>
              )}

              {kundliData?.favorableDates && (
                <Card>
                  <CardHeader>
                    <CardTitle>Favorable Dates (Next 30 Days)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {kundliData.favorableDates.slice(0, 10).map((date) => (
                        <Badge key={date} variant="outline" className="justify-center py-2">
                          {new Date(date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
