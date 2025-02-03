import React, { useState } from "react";
import axios from "axios";
import { FaDownload, FaMusic, FaLink, FaVideo } from "react-icons/fa";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadOptions, setDownloadOptions] = useState(null);
  const [format, setFormat] = useState("mp3");

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!url) {
      setError("Please enter a YouTube URL");
      return;
    }

    setLoading(true);
    setError("");
    setDownloadOptions(null);

    try {
      let apiUrl = "";
      let token = "QkVJcO60NbI5trOJjsismvQK1hCa8LzsF32Vufa517xxLMUD547S4vEH1HWZ";

      if (format === "mp4") {
        apiUrl = "https://api-dhx.xyz/api/v1/ytmp4-dl";
      } else if (format === "mp3") {
        apiUrl = "https://api-dhx.xyz/api/v1/ytmp3-dl";
      }

      const requestUrl = `${apiUrl}?api_token=${token}&q=${encodeURIComponent(url)}`;
      const response = await axios.get(requestUrl);

      console.log("Request URL:", requestUrl);
      console.log("Response Data:", response.data);

      if (response.data.status === "success") {
        setDownloadOptions(response.data.data);
      } else {
        setError("Failed to fetch video. Please check the URL and try again.");
      }
    } catch (err) {
      console.error("Error:", err.response || err.message);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6 space-x-4">
              <FaMusic className="text-6xl md:text-8xl text-white animate-bounce" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              YouTube MP3/MP4 Downloader
            </h1>
            <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
              Convert and download YouTube videos easily.
            </p>
          </div>

          {/* Form */}
          <div className="bg-purple-950/40 p-6 md:p-8 rounded-2xl shadow-xl mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Enter Video URL</h3>
            <form onSubmit={handleDownload} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400">
                    <FaLink />
                  </div>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste YouTube URL here..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-purple-900/50 border-2 border-purple-700/50 text-white"
                  />
                </div>
              </div>

              {/* Format Selection */}
              <div className="flex justify-center gap-4 my-4">
                <button
                  type="button"
                  onClick={() => setFormat("mp3")}
                  className={`px-6 py-3 rounded-lg transition ${
                    format === "mp3" ? "bg-purple-600 text-white" : "bg-purple-900/50 text-purple-300"
                  }`}
                >
                  <FaMusic /> MP3
                </button>
                <button
                  type="button"
                  onClick={() => setFormat("mp4")}
                  className={`px-6 py-3 rounded-lg transition ${
                    format === "mp4" ? "bg-purple-600 text-white" : "bg-purple-900/50 text-purple-300"
                  }`}
                >
                  <FaVideo /> MP4
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-purple-600 rounded-xl font-semibold transition"
                >
                  {loading ? "Processing..." : "Download"}
                </button>
              </div>
            </form>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 text-center">{error}</div>}

          {/* Download Section */}
          {downloadOptions && (
            <div className="bg-purple-900/50 p-6 rounded-xl shadow-lg text-center">
              <h2 className="text-lg font-semibold mb-4">Download Available</h2>
              <ul className="space-y-2">
                {downloadOptions.map((item, index) => (
                  <li key={index} className="flex justify-between items-center bg-purple-800 p-3 rounded-lg">
                    <span className="text-sm">
                      {item.title} - {item.quality}
                    </span>
                    <a
                      href={item.downloadUrl}
                      className="px-4 py-2 bg-purple-600 rounded-lg text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaDownload />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
