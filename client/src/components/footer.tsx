import { memo } from "react";
import { Link } from "wouter";
import { Clover, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = memo(() => {
  const browseByLinks = [
    "Mother Tongue",
    "Spiritual Practice", 
    "Guru Lineage",
    "City",
    "State"
  ];

  const serviceLinks = [
    "Success Stories",
    "Membership Plans",
    "Sattvik Connect",
    "Blog",
    "Help Center"
  ];

  return (
    <footer className="bg-earth-brown text-warm-beige py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center">
                <Clover className="text-sage" />
              </div>
              <div>
                <h3 className="font-crimson font-bold text-lg">SattvikVivah</h3>
                <p className="text-xs font-devanagari text-sage">सत्त्विक विवाह</p>
              </div>
            </div>
            <p className="text-warm-beige/80 text-sm">
              A platform for spiritually aligned souls seeking dharmic companionship in Grihastha Ashram.
            </p>
          </div>
          
          {/* Browse By Section */}
          <div>
            <h4 className="font-semibold mb-4">Browse By</h4>
            <ul className="space-y-2 text-sm text-warm-beige/80">
              {browseByLinks.map((link) => (
                <li key={link}>
                  <Link 
                    href={`/browse/${link.toLowerCase().replace(' ', '-')}`}
                    className="hover:text-sage transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services Section */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-warm-beige/80">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <Link 
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="hover:text-sage transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Connect Section */}
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <Link 
                href="/facebook"
                className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center hover:bg-sage/30 transition-colors"
              >
                <Facebook className="text-sage w-5 h-5" />
              </Link>
              <Link 
                href="/instagram"
                className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center hover:bg-sage/30 transition-colors"
              >
                <Instagram className="text-sage w-5 h-5" />
              </Link>
              <Link 
                href="/youtube"
                className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center hover:bg-sage/30 transition-colors"
              >
                <Youtube className="text-sage w-5 h-5" />
              </Link>
            </div>
            <p className="text-sm text-warm-beige/80">
              Download our app for spiritual matchmaking on the go.
            </p>
          </div>
        </div>
        
        <div className="border-t border-warm-beige/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-warm-beige/60 mb-4 md:mb-0">
              © 2024 SattvikVivah. All rights reserved. | 
              <Link href="/privacy" className="hover:text-sage"> Privacy Policy</Link> | 
              <Link href="/terms" className="hover:text-sage"> Terms of Service</Link>
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-sage font-devanagari text-lg animate-om-pulse">
                ॐ शान्ति शान्ति शान्ति
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
