import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
         
          <div className="w-full md:w-1/5 mb-6">
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>Office and Electricals in...</li>
              <li>Office and Electricals in Delhi</li>
              <li>Sauces and Spreads in Delhi</li>
              <li>Dairy, Bread and Eggs in Mumbai</li>
              <li>Beauty and Grooming in Delhi</li>
            </ul>
          
          </div>

          <div className="w-full md:w-1/5 mb-6">
            <h4 className="font-bold mb-4">We deliver to</h4>
            <ul className="space-y-2 text-sm">
              <li>Bangalore</li>
              <li>Delhi</li>
              <li>Jaipur</li>
              <li>Kochi</li>
              <li>Mumbai</li>
            </ul>
            
          </div>

          <div className="w-full md:w-1/5 mb-6">
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>About</li>
              <li>Careers</li>
              <li>Team</li>
              <li>Swiggy Instamart</li>
              <li>Swiggy Genie</li>
            </ul>
          </div>

          <div className="w-full md:w-1/5 mb-6">
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>Terms &amp; Conditions</li>
              <li>Cookie Policy</li>
              <li>Privacy Policy</li>
            </ul>
            <h4 className="font-bold mt-6 mb-4">Contact us</h4>
            <ul className="space-y-2 text-sm">
              <li>Help &amp; Support</li>
              <li>Partner with us</li>
              <li>Ride with us</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center mt-10 border-t border-gray-800 pt-6">
          <p className="text-sm">&copy; 2024 Twiggy</p>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;


