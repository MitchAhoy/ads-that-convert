import HubSpotLeadForm from "@/components/forms/HubSpotLeadForm";

export default function HubSpotTestForm() {
  return (
    <HubSpotLeadForm
      showFirstName
      submitLabel="Submit test form"
      submittingLabel="Submitting..."
      successMessage="Success. The HubSpot form submission was accepted."
      className="mt-6"
      emailLabel="Email"
      firstNameLabel="First name"
    />
  );
}
