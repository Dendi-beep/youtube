import React, { useState } from 'react';
import axios from 'axios';
import { FaYoutube, FaDownload, FaMusic, FaLink, FaInfoCircle, FaVideo } from 'react-icons/fa';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadData, setDownloadData] = useState(null);
  const [format, setFormat] = useState('mp3');

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a YouTube URL');
      return;
    }
  
    setLoading(true);
    setError('');
    setDownloadData(null);
  
    try {
      const response = await axios.get(`https://api-two-delta-18.vercel.app/api/ap`, {
        params: {
          url: url,
          format: format === 'mp4' ? '720' : 'mp3'
        }
      });
  
      if (response.data.status === 'success') {
        setDownloadData({
          url: response.data.data.downloadUrl,
          title: response.data.data.title || 'Download File'
        });
      } else {
        console.error(response.data);
        setError('Failed to fetch video. Please check the URL and try again.');
      }
    } catch (err) {
      console.error('Error:', err.response || err.message);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center mb-6 space-x-4">
              <FaYoutube className="text-6xl md:text-8xl text-red-500 animate-pulse" />
              <div className="flex gap-2">
                <FaMusic className="text-4xl md:text-6xl text-white animate-bounce" />
                <FaVideo className="text-4xl md:text-6xl text-white animate-bounce delay-100" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
              YouTube Downloader
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <FaInfoCircle className="text-purple-300" />
              <h2 className="text-xl md:text-2xl text-purple-200">
                Download Videos as MP3 or MP4
              </h2>
            </div>
            <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
              Convert and download YouTube videos in your preferred format
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-purple-950/40 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">How It Works</h3>
            <ol className="list-decimal list-inside space-y-2 text-purple-200">
              <li>Copy the YouTube video URL you want to download</li>
              <li>Paste the URL in the input field below</li>
              <li>Select your preferred format (MP3 or MP4)</li>
              <li>Click Download and wait for processing</li>
              <li>Click the Download button when it appears</li>
            </ol>
          </div>

          {/* Form */}
          <div className="bg-purple-950/40 p-6 md:p-8 rounded-2xl shadow-xl mb-8 transition-transform duration-300 hover:scale-[1.02] will-change-transform">
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
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-purple-900/50 border-2 border-purple-700/50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-purple-400 transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Format Selection */}
              <div className="flex justify-center gap-4 my-4">
                <button
                  type="button"
                  onClick={() => setFormat('mp3')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors duration-300 ${
                    format === 'mp3'
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-900/50 text-purple-300 hover:bg-purple-800/50'
                  }`}
                >
                  <FaMusic /> MP3 Audio
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('720')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors duration-300 ${
                    format === '720'
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-900/50 text-purple-300 hover:bg-purple-800/50'
                  }`}
                >
                  <FaVideo /> MP4 Video (720p)
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      <FaDownload className="mr-2" />
                      Download
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 border-2 border-red-700/50 text-red-200 px-6 py-4 rounded-xl mb-8 animate-shake">
              <p className="flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </p>
            </div>
          )}

          {/* Download Section */}
          {downloadData && (
            <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 border-2 border-purple-700/50 rounded-xl p-8 text-center mb-12 animate-fade-in shadow-2xl">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 line-clamp-2">
                Ready to Download: {downloadData.title}
              </h2>
              <div className="flex flex-col items-center gap-4">
                <a
                  href={downloadData.url}
                  download
                  className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 rounded-xl font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaDownload className="mr-2" />
                  Download {format.toUpperCase()}
                </a>
                <p className="text-sm text-purple-300">
                  Format: {format === 'mp4' ? 'MP4 (720p)' : 'MP3'}
                </p>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: <FaMusic />,
                title: "MP3 Audio",
                description: "Extract high-quality audio from videos"
              },
              {
                icon: <FaVideo />,
                title: "MP4 Video",
                description: "Download videos in 720p quality"
              },
              {
                icon: <FaYoutube />,
                title: "Easy to Use",
                description: "Simple interface for both audio and video downloads"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-purple-950/40 p-6 rounded-xl text-center transition-transform duration-300 hover:scale-105 border-2 border-purple-700/20 hover:border-purple-600/50"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-purple-200 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-16 text-purple-300 text-sm">
            <p>© {new Date().getFullYear()} YouTube Downloader. For personal use only.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;