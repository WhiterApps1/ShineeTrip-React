import React from "react";
import {
  Check,
  Calendar,
  MapPin,
  Users,
  Mail,
  Download,
  Home,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EventBookingSuccessCardProps {
  bookingData: any;
}

const EventBookingSuccessCard: React.FC<EventBookingSuccessCardProps> = ({
  bookingData,
}) => {
  const navigate = useNavigate();
  if (!bookingData) return null;

  const event = bookingData.booking.event || bookingData.booking;
  const ticket = bookingData.booking.eventTicket;
  const customer = bookingData.booking.customer;

  const formatDate = (d?: string) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "TBA";

  return (
    <div className="fixed inset-0 z-[400] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-5 animate-in fade-in zoom-in">

        {/* Header */}
        <div className="text-center mb-4">
          <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <Check className="text-emerald-600" size={18} />
          </div>
          <h1 className="text-lg font-bold text-gray-900">
            Booking Confirmed
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {bookingData.booking.event_title || event?.title}
          </p>
        </div>

        {/* Card */}
        <div className="border rounded-lg p-4 space-y-3 text-sm">

          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Booking ID
            </p>
            <p className="font-semibold text-gray-800">
              {bookingData.booking.receipt}
            </p>
          </div>

          <div className="flex gap-3">
            <Calendar size={16} className="text-gray-400" />
            <span>{formatDate(bookingData.booking.event_date)}</span>
          </div>

          <div className="flex gap-3">
            <MapPin size={16} className="text-gray-400" />
            <span className="line-clamp-2">{event?.addr}</span>
          </div>

          <div className="flex gap-3">
            <Users size={16} className="text-gray-400" />
            <span>
              {bookingData.booking.ticket_qty} × {ticket?.name}
            </span>
          </div>

          <div className="flex gap-3">
            <Tag size={16} className="text-gray-400" />
            <span>₹{bookingData.booking.total_amount}</span>
          </div>

          <div className="pt-2 border-t text-xs text-gray-500 flex items-center gap-2">
            <Mail size={14} />
            {customer?.email}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-emerald-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-emerald-700"
          >
            <Download size={14} className="inline mr-1" />
            Download
          </button>

          <button
            onClick={() => navigate("/mybooking")}
            className="flex-1 border py-2 rounded-md text-sm font-semibold hover:bg-gray-50"
          >
            <Home size={14} className="inline mr-1" />
            My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventBookingSuccessCard;