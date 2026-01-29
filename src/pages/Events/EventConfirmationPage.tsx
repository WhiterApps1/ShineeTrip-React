import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, Clock, FileText, Phone, UserCheck } from "lucide-react";

const EventConfirmationPage = () => {
    const { enquiryId } = useParams();
    const navigate = useNavigate();
    
    // Format ID to look like the design (e.g., EVT-2025-12847)
    // Assuming enquiryId is just a number from DB, we format it.
    const currentYear = new Date().getFullYear();
    const formattedId = `EVT-${currentYear}-${enquiryId?.padStart(5, '0')}`;

    return (
        <div className="min-h-screen bg-[#EAEAEA] font-opensans flex flex-col items-center justify-center py-10 px-4 pt-24">

            {/* --- SUCCESS ICON --- */}
            <div className="w-24 h-24 bg-[#916E2B] rounded-full flex items-center justify-center shadow-xl mb-6 border-4 border-[#CA9C43]">
                <Check size={48} className="text-white" strokeWidth={4} />
            </div>

            {/* --- HEADINGS --- */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">
                Enquiry Submitted Successfully!
            </h1>

            <p className="text-gray-500 text-center max-w-2xl mb-8 leading-relaxed">
                Thank you for choosing ShineeTrip Events for your special celebration. Your event enquiry has been received and our dedicated event planning team is already reviewing your requirements.
            </p>

            {/* --- REFERENCE NUMBER BOX --- */}
            <div className="bg-[#F5F0E6] border border-[#E8DCC2] rounded-xl py-6 px-12 text-center mb-12 shadow-sm w-full max-w-md">
                <p className="text-gray-600 font-semibold mb-2">Your Enquiry Reference Number</p>
                <h2 className="text-3xl font-bold text-[#CA9C43] tracking-wider">
                    {formattedId}
                </h2>
            </div>

            {/* --- WHAT HAPPENS NEXT SECTION --- */}
            <div className="w-full max-w-3xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-[1px] flex-1 bg-gray-300"></div>
                    <h3 className="text-xl font-bold text-[#5A4828]">What Happens Next?</h3>
                    <div className="h-[1px] flex-1 bg-gray-300"></div>
                </div>

                <div className="space-y-6">

                    {/* Step 1 */}
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#CA9C43] flex items-center justify-center text-white font-bold shadow-md">
                            1
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Immediate Confirmation</h4>
                            <p className="text-gray-500 text-sm">You'll receive a confirmation email with your enquiry details within 5 minutes.</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#CA9C43] flex items-center justify-center text-white font-bold shadow-md">
                            2
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Expert Review (Within 4 Hours)</h4>
                            <p className="text-gray-500 text-sm">Our event specialists and the venue team will review your requirements.</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#CA9C43] flex items-center justify-center text-white font-bold shadow-md">
                            3
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Personal Consultation Call (Within 24 Hours)</h4>
                            <p className="text-gray-500 text-sm">A dedicated event planner will contact you to discuss your vision in detail.</p>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#CA9C43] flex items-center justify-center text-white font-bold shadow-md">
                            4
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Customized Proposal</h4>
                            <p className="text-gray-500 text-sm">Receive a detailed, personalized event proposal tailored to your needs and budget.</p>
                        </div>
                    </div>

                </div>

                {/* --- HOME BUTTON --- */}
                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-500 hover:text-[#CA9C43] font-medium transition-colors underline"
                    >
                        Back to Home Page
                    </button>
                </div>

            </div>

        </div>
    );
};

export default EventConfirmationPage;