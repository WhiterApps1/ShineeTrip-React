import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Users, Briefcase, IndianRupee, CheckCircle, ParkingCircle, Utensils, Home, Paintbrush } from "lucide-react";

// --- Types based on Swagger ---
interface Amenity {
  id: number;
  name: string;
  img_link: string;
}

interface EventType {
  id: number;
  name: string;
}

interface VenueDetails {
  id: number;
  name: string;
  cover_img: string;
  images: string[];
  desc: string;
  location: string;
  min_price: number;
  budget_range: string;
  venue_type: string;
  min_guest_capacity: number;
  max_guest_capacity: number;
  luxury: boolean;
  event_types: EventType[][]; // API structure is nested array based on swagger
  amenities: Amenity[];
}

const API_BASE_URL = "http://46.62.160.188:3000";

const VenueDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<VenueDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const token = sessionStorage.getItem("shineetrip_token");
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${API_BASE_URL}/event-venue/${id}`, { headers });
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        setVenue(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenueDetails();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-[#F2F2F2]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D2A256]"></div>
    </div>
  );

  if (!venue) return <div className="text-center py-20">Venue not found</div>;

  // --- Helper Functions ---
  const formatPrice = (price: number) => {
    if (price >= 100000) return `₹${(price / 100000).toFixed(0)}L`;
    if (price >= 1000) return `₹${(price / 1000).toFixed(0)}k`;
    return `₹${price}`;
  };

  // Flatten event types for tags (handling nested array structure from swagger)
  const tags = venue.event_types?.flat().map(t => t.name) || [];

  // Combine cover image with other images for gallery
  const galleryImages = [venue.cover_img, ...(venue.images || [])].slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F2F2F2] font-opensans pb-20 pt-24 px-4 sm:px-6 lg:px-8">
      
      {/* --- BACK BUTTON --- */}
      <div className="max-w-7xl mx-auto mb-6">
        <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-500 hover:text-[#CA9C43] transition-colors font-medium"
        >
            <ArrowLeft size={20} className="mr-2" />
            Back to venues
        </button>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] shadow-sm p-6 md:p-8">
        
        {/* HEADER */}
        <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">{venue.name}</h1>
            <div className="flex items-center text-gray-600 gap-4">
                <div className="flex items-center">
                    <MapPin size={18} className="mr-1 text-gray-400" />
                    <span>{venue.location}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Star size={16} className="text-[#D2A256] fill-current" />
                    <span className="font-bold text-gray-800">4.8</span>
                    <span className="text-gray-400 text-sm">(156 reviews)</span>
                </div>
            </div>
        </div>

        {/* --- IMAGE GALLERY (Grid Layout) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10 h-[500px] md:h-[400px]">
            {/* Main Large Image */}
            <div className="lg:col-span-2 h-full">
                <img 
                    src={galleryImages[0]} 
                    alt="Main View" 
                    className="w-full h-full object-cover rounded-2xl cursor-pointer hover:opacity-95 transition-opacity"
                />
            </div>
            
            {/* Side Images Stack */}
            <div className="hidden lg:grid grid-rows-3 gap-4 h-full">
                {galleryImages.slice(1).map((img, idx) => (
                    <div key={idx} className="relative overflow-hidden rounded-2xl h-full">
                        <img 
                            src={img} 
                            alt={`Gallery ${idx}`} 
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                         {idx === 2 && galleryImages.length > 4 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg">
                                +{venue.images.length - 3} More
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN (Details) */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Key Details Card */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">Key Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                        {/* Guest Capacity */}
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Guest Capacity</p>
                            <div className="flex items-center gap-2 font-bold text-[#1A1A1A] text-lg">
                                <Users className="text-gray-400" size={20} />
                                {venue.min_guest_capacity}-{venue.max_guest_capacity} guests
                            </div>
                        </div>

                        {/* Venue Type */}
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Venue Type</p>
                            <div className="font-bold text-[#1A1A1A] text-lg">
                                {venue.venue_type}
                            </div>
                        </div>

                        {/* Suitability (Tags) */}
                        <div>
                            <p className="text-gray-500 text-sm mb-2">Event Suitability</p>
                            <div className="flex flex-wrap gap-2">
                                {tags.length > 0 ? tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                                        {tag}
                                    </span>
                                )) : <span className="text-gray-400 text-sm">General Events</span>}
                            </div>
                        </div>

                         {/* Budget Range */}
                         <div>
                            <p className="text-gray-500 text-sm mb-1">Budget Range</p>
                            <div className="font-bold text-[#1A1A1A] text-lg">
                                {venue.budget_range || "Flexible"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Amenities Card */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                     <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">Amenities</h2>
                     
                     <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                        {venue.amenities.length > 0 ? venue.amenities.map((amenity) => (
                             <div key={amenity.id} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                                {/* Use API Image if available, else fallback icon */}
                                {amenity.img_link ? (
                                    <img src={amenity.img_link} alt={amenity.name} className="w-6 h-6" />
                                ) : (
                                    <CheckCircle className="text-[#CA9C43]" size={20} />
                                )}
                                <span className="font-medium text-gray-700">{amenity.name}</span>
                             </div>
                        )) : (
                            <div className="text-gray-400 italic">Amenities details available on request</div>
                        )}
                     </div>
                </div>

                {/* About Venue */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">About this venue</h2>
                    <p className="text-gray-600 leading-relaxed">
                        {venue.desc}
                    </p>
                </div>

            </div>

            {/* RIGHT COLUMN (Sticky Booking Card) */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                    <p className="text-gray-500 text-sm mb-1">Starting from</p>
                    <h3 className="text-4xl font-bold text-[#1A1A1A] mb-6">
                        {formatPrice(venue.min_price)}
                    </h3>

                    <button 
                        className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                        style={{
                            background: 'linear-gradient(90deg, #CA9C43 0%, #916E2B 100%)',
                        }}
                        onClick={() => {
                            if (venue) {
            navigate(`/event-enquiry/${venue.id}`);
        }
                            console.log("Proceed with booking for venue:", venue.id);
                        }}
                    >
                        Proceed with this venue
                    </button>

                    <p className="text-center text-gray-400 text-xs mt-4">
                        Our team will contact you shortly after submission
                    </p>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default VenueDetailsPage;