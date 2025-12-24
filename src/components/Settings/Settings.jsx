import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetTermsQuery,
  useUpdateTermsMutation,
} from "../../Api/authApi";
import JoditEditor from "jodit-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("terms");
  const {
    data: privacyData,
    isLoading: isPrivacyLoading,
    refetch: refetchPrivacy,
  } = useGetPrivacyPolicyQuery();
  const {
    data: termsData,
    isLoading: isTermsLoading,
    refetch: refetchTerms,
  } = useGetTermsQuery();
  const [updatePrivacyPolicy, { isLoading: isUpdatingPrivacy }] =
    useUpdatePrivacyPolicyMutation();
  const [updateTerms, { isLoading: isUpdatingTerms }] =
    useUpdateTermsMutation();

  const [content, setContent] = useState({
    privacy: "",
    terms: "",
  });

  const editor = useRef(null);
  useEffect(() => {
    setContent({
      privacy: privacyData?.text,
      terms: termsData?.text,
    });
  }, [privacyData, termsData]);
  const config = {
    toolbar: {
      items: [
        "bold",
        "italic",
        "underline",
        "align",
        "left",
        "center",
        "right",
        "justify",
        "font-size",
        "font-family",
      ],
    },
  };

  useEffect(() => {
    if (editor.current && editor.current.editor) {
      editor.current.editor.focus();
    }
  }, [content]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleContentChange = (newContent) => {
    setContent({
      ...content,
      [activeTab]: newContent,
    });
  };

  const updateContent = async (tab, content) => {
    // Send the updated content to the server or perform any other actions
    if (tab === "privacy") {
      try {
        await updatePrivacyPolicy({
          id: null,
          data: { text: content },
        }).unwrap();
        toast.success("Privacy policy updated successfully!");
      } catch (error) {
        toast.error("Failed to save changes.");
      }
    }
    if (tab === "terms") {
      try {
        await updateTerms({ id: null, data: { text: content } }).unwrap();
        toast.success("Terms and conditions updated successfully!");
      } catch (error) {
        toast.error("Failed to save changes.");
      }
    }
  };

  return (
    <div className="h-[90vh] overflow-y-scroll bg-accent">
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
            Terms and Conditions
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "privacy"
                ? "text-primary border-b-2 border-primary "
                : "text-subgray"
            }`}
            onClick={() => handleTabChange("privacy")}
          >
            Privacy Policy
          </button>
        </div>
        <div className="mt-6 p-4 border rounded-lg">
          <JoditEditor
            ref={editor}
            value={content[activeTab]}
            onBlur={handleContentChange}
            config={config} // Apply the custom config
          />
        </div>
        <div className="mt-6">
          <button
            className="px-10 py-2 bg-black text-white font-medium rounded-2xl"
            onClick={() => updateContent(activeTab, content[activeTab])}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
