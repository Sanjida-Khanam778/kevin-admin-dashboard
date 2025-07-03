import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { GrTextAlignCenter } from "react-icons/gr";
import { MdFormatAlignLeft, MdFormatAlignRight } from "react-icons/md";

// Rich text editor component with tabs for Terms and Privacy Policy
export default function TextEditor() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("terms");

  // Initial content for both tabs
  const initialTermsContent = `<section>
  <h2>Welcome to [Your App Name]!</h2>
  <p>
    By accessing or using our fitness app and its associated services, you agree to the following terms and conditions.
  </p>

  <h3>1. Account & Eligibility</h3>
  <ul style="list-style-type: disc; margin-left: 20px;"> 
    <li>Users must be at least [age] years old to create an account.</li>
    <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
    <li>We reserve the right to suspend or terminate accounts that violate these terms or misuse the app.</li>
  </ul>

  <h3>2. Subscription & Payments</h3>
  <ul style="list-style-type: disc; margin-left: 20px;">
    <li>Some features, including personalized workout plans, coaching, or premium tracking tools, require a paid subscription.</li>
    <li>Subscription fees are billed according to the selected plan.</li>
    <li>Payments are non-refundable unless otherwise stated in our refund policy.</li>
    <li>You may cancel your subscription anytime through the Manage Subscription section of your account settings.</li>
  </ul>

  <h3>3. Fitness Content & Usage</h3>
  <ul style="list-style-type: disc; margin-left: 20px;">
    <li>Our app provides fitness-related content including workouts, training plans, and wellness tips.</li>
    <li>This content is not a substitute for professional medical advice. Always consult your physician before starting any fitness program.</li>
    <li>Use of the app’s features and content is at your own risk. You agree not to engage in exercises that are beyond your capabilities or that could result in injury.</li>
  </ul>

  <h3>4. Data Privacy & Security</h3>
  <ul style="list-style-type: disc; margin-left: 20px;">
    <li>We collect and process personal and health-related data in accordance with our Privacy Policy.</li>
    <li>Your data is stored securely and may be used to personalize your fitness experience and improve our services.</li>
    <li>We do not sell user data to third parties.</li>
  </ul>

  <h3>5. Prohibited Activities</h3>
  <ul style="list-style-type: disc; margin-left: 20px;">
    <li>Use the app for any unlawful, harmful, or deceptive activity.</li>
    <li>Share false health or fitness information.</li>
    <li>Interfere with or disrupt the operation of the app or its services.</li>
    <li>Violate any applicable laws or third-party rights.</li>
  </ul>

  <h3>6. Service Availability & Modifications</h3>
  <ul style="list-style-type: disc; margin-left: 20px;">
    <li>We may update, modify, or discontinue features of the app at any time.</li>
    <li>While we strive to maintain service availability, we are not liable for disruptions, technical issues, or loss of data.</li>
  </ul>
</section>
`;

  const initialPrivacyContent = `<section>
  <h2>Welcome to [Your App Name]</h2>
  <p>
    Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your data when 
    you use our AI voice cloning platform.
  </p>

  <h3>1. Information We Collect</h3>
  <ul style="list-style-type: disc; margin-left: 20px;">
    <li><strong>Personal Information:</strong> Name, email, and account details.</li>
    <li><strong>Voice Data:</strong> Audio samples uploaded for AI voice cloning.</li>
    <li><strong>Usage Data:</strong> Interactions with our platform, such as settings, preferences, and feedback.</li>
    <li><strong>Payment Information:</strong> Processed securely through third-party payment providers.</li>
  </ul>

  <h3>2. How We Use Your Data</h3>
  <ul style="list-style-type: disc; margin-left: 20px;">
    <li>Provide and improve our AI voice cloning services.</li>
    <li>Personalize your AI-generated voice experience.</li>
    <li>Enhance AI accuracy based on user interactions.</li>
    <li>Ensure security and prevent fraudulent activities.</li>
    <li>Send updates, promotions, or important notifications (you can opt out anytime).</li>
  </ul>

  <h3>3. Data Sharing & Security</h3>
  <ul style="list-style-type: disc; margin-left: 20px;">
    <li>We do not sell your personal data to third parties.</li>
    <li>Voice data is processed securely and used solely for AI training within your account.</li>
    <li>We may share necessary data with service providers (e.g., payment processors) under strict confidentiality agreements.</li>
    <li>Data is protected with encryption and security measures to prevent unauthorized access.</li>
  </ul>

  <h3>4. User Control & Choices</h3>
  <ul style="list-style-type: disc; margin-left: 20px;">
    <li>You can update or delete your account information from the My Profile section.</li>
    <li>You can request data deletion by contacting <strong>[Your Support Email]</strong>.</li>
    <li>You can manage communication preferences (e.g., email notifications).</li>
  </ul>

  <h3>5. Changes to This Policy</h3>
  <p>
    We may update this policy from time to time. Continued use of the platform after updates means you accept the changes.
  </p>

  <h3>6. Contact Us</h3>
  <p>
    For any questions or privacy concerns, contact us at <strong>[Your Support Email]</strong>.
  </p>
</section>
`;

  // State for content of each tab
  const [termsContent, setTermsContent] = useState(initialTermsContent);
  const [privacyContent, setPrivacyContent] = useState(initialPrivacyContent);

  const getCurrentContent = () => {
    return activeTab === "terms" ? termsContent : privacyContent;
  };

  // Function to set current content based on active tab
  const setCurrentContent = (content) => {
    if (activeTab === "terms") {
      setTermsContent(content);
    } else {
      setPrivacyContent(content);
    }
  };

  // Initialize the editor when component mounts or active tab changes
  useEffect(() => {
    const contentEditable = document.getElementById("editor-content");
    if (contentEditable) {
      contentEditable.innerHTML = getCurrentContent();
    }
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (tab) => {
    // Save current content before switching tabs
    const contentEditable = document.getElementById("editor-content");
    if (contentEditable) {
      if (activeTab === "terms") {
        setTermsContent(contentEditable.innerHTML);
      } else {
        setPrivacyContent(contentEditable.innerHTML);
      }
    }

    // Switch tab
    setActiveTab(tab);
  };

  // Format text functions
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    // Update content state after formatting
    const contentEditable = document.getElementById("editor-content");
    if (contentEditable) {
      setCurrentContent(contentEditable.innerHTML);
    }
  };

  // Save changes
  const saveChanges = async () => {
    // Save current content
    const contentEditable = document.getElementById("editor-content");
    if (contentEditable) {
      setCurrentContent(contentEditable.innerHTML);
    }
    try {
      // Simulate API call to save changes
      const response = {
        terms_and_conditions: termsContent,
        privacy_policy: privacyContent,
      };
      // const res = await createTermsAndPolicy(response);
      toast.success("Changes saved successfully!");
    } catch (error) {
      // console.log(error);
      toast.error("Failed to save changes.");
    }
  };

  return (
    <div className="h-[92vh] overflow-y-scroll bg-accent">
      <div className="w-11/12 h-[90vh] mx-auto mb-6">
        {/* Tabs */}
        <div className="flex mt-2">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "terms"
                ? "text-primary border-b-2 border-primary "
                : "text-subgray"
            }`}
            onClick={() => handleTabChange("terms")}
          >
            Terms and condition
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "privacy"
                ? "text-primary border-b-2 border-primary "
                : "text-subgray"
            }`}
            onClick={() => handleTabChange("privacy")}
          >
            Privacy policy
          </button>
        </div>

        <div className="flex items-center justify-start mt-4 rounded">
          {/* Font size */}
          <select
            defaultValue="3"
            className="px-1 py-0.5 text-sm border border-borderGray rounded mr-1"
            onChange={(e) => formatText("fontSize", e.target.value)}
          >
            <option value="1">10</option>
            <option value="2">11</option>
            <option value="3">12</option>
            <option value="4">14</option>
            <option value="5">16</option>
            <option value="6">17</option>
            <option value="7">18</option>
          </select>

          <div className="border border-borderGray rounded">
            {/* Bold */}
            <button
              className="px-2 py-0.5  text-sm font-bold border-r border-borderGray"
              onClick={() => formatText("bold")}
            >
              B
            </button>

            {/* Italic */}
            <button
              className="px-2 py-0.5  italic text-sm border-r border-borderGray"
              onClick={() => formatText("italic")}
            >
              I
            </button>

            {/* Underline */}
            <button
              className="px-2 py-0.5  underline text-sm"
              onClick={() => formatText("underline")}
            >
              U
            </button>
          </div>

          {/* Text align group */}
          <div className="flex space-x-1 border border-borderGray rounded ml-1">
            <button
              className="px-2 py-1.5  text-sm border-r border-borderGray"
              onClick={() => formatText("justifyLeft")}
            >
              <span className="w-4">
                <MdFormatAlignLeft />
              </span>
            </button>

            <button
              className="px-2 py-1  rounded text-sm border-r border-borderGray"
              onClick={() => formatText("justifyCenter")}
            >
              <span className="w-4">
                <GrTextAlignCenter />
              </span>
            </button>

            <button
              className="px-2 py-1 text-sm "
              onClick={() => formatText("justifyRight")}
            >
              <span className="w-4">
                <MdFormatAlignRight />
              </span>
            </button>
          </div>
        </div>

        {/* Editable content area */}
        <div
          id="editor-content"
          className="min-h-96 outline-none bg-white rounded-lg my-8"
          contentEditable="true"
          dangerouslySetInnerHTML={{ __html: getCurrentContent() }}
        />

        {/* Save button */}
        <div className="bg-gray-50">
          <button
            className="w-full bg-primary  text-white font-medium py-2 px-4 rounded"
            onClick={saveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
