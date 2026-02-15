import { Card, } from "@mui/material";
import { ArrowRight, CheckCircle, Code2, Menu, Search, X, Zap } from "lucide-react";

import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const LandingPage = ({ onNavigate }) => {
    const [url, setUrl] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleAnalyze = () => {
        if (url) {
            onNavigate('new-scan');
        }
    };

    return (
        <>
            {/* navbar start */}
            <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-md z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                        // onClick={() => onNavigate("home")}
                        >
                            <div className="w-8 h-8 bg-primaryText rounded-lg flex items-center justify-center">
                                <Code2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold font-montserrat text-xl text-primaryText">
                                BugAnalyzer AI
                            </span>
                        </div>
                        {/* laptop view */}
                        <div className="hidden lg:flex items-center gap-8">
                            <a href="#" className="nav-link text-primaryText hover:text-brandBlue text-justify
                                font-montserrat font-bold transition-colors ">Home</a>
                            <a href="#features" className="nav-link text-primaryText hover:text-brandBlue text-justify
                                font-montserrat font-bold transition-colors ">Features</a>
                            <a href="#how-it-works" className="nav-link text-primaryText hover:text-brandBlue text-justify
                                font-montserrat font-bold transition-colors ">How It Works</a>
                            <a href="#reports" className="nav-link text-primaryText hover:text-brandBlue text-justify
                                font-montserrat font-bold transition-colors ">Reports</a>
                            <button
                                onClick={() => navigate("/login")}
                                // className=" border-brandBlue text-white font-bold px-4 
                                // py-2 rounded-md bg-brandBlue  
                                // transition"
                                className="flex items-center gap-2 px-4 py-2 rounded-md font-bold text-white
                                  bg-brandBlue  shadow-[inset_0.4px_1px_4px_rgba(255,255,255,0.25)]        
                                     transition-all duration-150  ease-[cubic-bezier(0.22,0.61,0.36,1)]    
                                        hover:scale-110 active:scale-100 active:tracking-wider
                                        hover:shadow-[inset_0.4px_1px_4px_rgba(255,255,255,0.35),2px_4px_8px_rgba(0,0,0,0.3)]     
                                     active:shadow-[inset_0.4px_1px_8px_rgba(255,255,255,0.5),0_0_8px_rgba(59,130,246,0.6)] "
                            >
                                Login
                            </button>
                            <button
                                // onClick={() => onNavigate("new-scan")}
                                onClick={() => navigate("/new-scan")}
                                className="flex items-center gap-2 px-4 py-2 rounded-md font-bold text-white
                                  bg-brandBlue  shadow-[inset_0.4px_1px_4px_rgba(255,255,255,0.25)]        
                                     transition-all duration-150  ease-[cubic-bezier(0.22,0.61,0.36,1)]    
                                        hover:scale-110 active:scale-100 active:tracking-wider
                                        hover:shadow-[inset_0.4px_1px_4px_rgba(255,255,255,0.35),2px_4px_8px_rgba(0,0,0,0.3)]     
                                     active:shadow-[inset_0.4px_1px_8px_rgba(255,255,255,0.5),0_0_8px_rgba(59,130,246,0.6)] "
                            >
                                Start Free Scan
                            </button>
                        </div>
                        {/* mobile & tablet view */}
                        <button
                            className="lg:hidden"
                            onClick={() => setMenuOpen(prev => !prev)}
                            aria-label="Toggle Menu"
                        >
                            {menuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* mobile & tablet view */}
                {menuOpen && (
                    <div className="lg:hidden bg-white border-t shadow-md">
                        <div className="flex flex-col gap-4 p-4">
                            <a href="#" className="nav-link  font-montserrat font-bold"
                                onClick={() => setMenuOpen(false)}>Home</a>
                            <a href="#features" className="nav-link  font-montserrat font-bold"
                                onClick={() => setMenuOpen(false)}>Features</a>
                            <a href="#how-it-works" className="nav-link  font-montserrat font-bold"
                                onClick={() => setMenuOpen(false)}>How It Works</a>
                            <a href="#reports" className="nav-link  font-montserrat font-bold"
                                onClick={() => setMenuOpen(false)}>Reports</a>
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("/login");
                                }}
                                className="border border-brandBlue py-2 rounded-md font-bold"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("new-scan");
                                }}
                                className="bg-brandBlue text-white py-2 rounded-md font-bold"
                            >
                                Start Free Scan
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Spacer */}
            <div className="h-16"></div>

            {/* Hero Section  start*/}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl mb-6 text-primaryText font-sans font-medium max-w-4xl mx-auto">
                        Analyze Website Bugs & Code Quality Using AI
                    </h1>
                    <p className="text-xl text-slate-500 font-robotoCondensed  mb-12 max-w-3xl mx-auto">
                        Detect bugs, performance issues, security risks, and code quality problems instantly using AI and manual testing.
                    </p>

                    {/* URL Input Section */}
                    <div className="max-w-3xl mx-auto mb-6 px-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-stretch">

                            {/* Input */}
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                                <input
                                    type="url"
                                    placeholder="https://example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="
                                        w-full h-14 pl-12 pr-4
                                        text-lg
                                        border-2 border-gray-300
                                        rounded-md
                                        focus:outline-none
                                        focus:border-brandBlue
                                        "
                                />
                            </div>

                            {/* Button */}
                            <button
                                onClick={() => navigate("/scan-results")}
                                className="flex items-center gap-2 px-4 py-2 rounded-md font-bold text-white
                                  bg-brandBlue  shadow-[inset_0.4px_1px_4px_rgba(255,255,255,0.25)]        
                                     transition-all duration-150  ease-[cubic-bezier(0.22,0.61,0.36,1)]    
                                        hover:scale-110 active:scale-100 active:tracking-wider
                                         hover:shadow-[inset_0.4px_1px_4px_rgba(255,255,255,0.35),2px_4px_8px_rgba(0,0,0,0.3)]     
                                        active:shadow-[inset_0.4px_1px_8px_rgba(255,255,255,0.5),0_0_8px_rgba(59,130,246,0.6)] "
                            >
                                Analyze Website
                                <ArrowRight className="w-5 h-5" />
                            </button>

                        </div>
                    </div>

                    {/* Sample Report */}
                    <button
                        onClick={() => navigate("/reports")}   // ✅ Navigate to report page
                        className="text-brandBlue hover:underline font-medium 
             hover:scale-110 active:scale-100 active:tracking-wider"
                    >
                        View Sample Report →
                    </button>

                </div>
            </div>

            {/* Feature Cards */}
            <div id="features" className=" max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
                <Card className="p-6  transition-shadow border-0 bg-white  hover:scale-110
                      hover:shadow-[inset_0.4px_1px_4px_rgba(255,255,255,0.35),2px_4px_8px_rgba(0,0,0,0.3)]     
                     active:shadow-[inset_0.4px_1px_8px_rgba(255,255,255,0.5),0_0_8px_rgba(59,130,246,0.6)] 
                     ">
                    {/* hover:shadow-xl */}
                    {/* active:scale-100  */}
                    {/* active:tracking-wider */}
                    <div className="w-12 h-12 bg-[#2563EB]/10 rounded-lg flex items-center  justify-center mb-4">
                        <Search className="w-6 h-6 text-[#2563EB] " />
                    </div>
                    <h3 className="mb-2 text-[#1F2937] font-serif font-bold">Bug Detection</h3>
                    <p className="text-gray-500 text-sm font-robotoCondensed">
                        Automatically identify bugs, errors, and issues across your entire website
                    </p>
                </Card>

                <Card className="p-6  transition-shadow border-0 bg-white  hover:scale-110
                      hover:shadow-[inset_0.4px_1px_4px_rgba(255,255,255,0.35),2px_4px_8px_rgba(0,0,0,0.3)]     
                     active:shadow-[inset_0.4px_1px_8px_rgba(255,255,255,0.5),0_0_8px_rgba(59,130,246,0.6)] 
                     ">
                    <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-lg flex items-center justify-center mb-4">
                        <Code2 className="w-6 h-6 text-[#4F46E5]" />
                    </div>
                    <h3 className="mb-2 text-[#1F2937] font-serif font-bold">Code Quality Analysis</h3>
                    <p className="text-gray-500 text-sm font-robotoCondensed">
                        Analyze code structure, detect unused CSS, inline JS, and duplicate code
                    </p>
                </Card>

                <Card className="p-6  transition-shadow border-0 bg-white  hover:scale-110
                      hover:shadow-[inset_0.4px_1px_4px_rgba(255,255,255,0.35),2px_4px_8px_rgba(0,0,0,0.3)]     
                     active:shadow-[inset_0.4px_1px_8px_rgba(255,255,255,0.5),0_0_8px_rgba(59,130,246,0.6)] 
                     ">
                    <div className="w-12 h-12 bg-[#16A34A]/10 rounded-lg flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6 text-[#16A34A]" />
                    </div>
                    <h3 className="mb-2 text-[#1F2937] font-serif font-bold">Performance & Security</h3>
                    <p className="text-gray-500 text-sm font-robotoCondensed">
                        Monitor load times, image sizes, and security vulnerabilities in real-time
                    </p>
                </Card>

                <Card className="p-6  transition-shadow border-0 bg-white  hover:scale-110
                      hover:shadow-[inset_0.4px_1px_4px_rgba(255,255,255,0.35),2px_4px_8px_rgba(0,0,0,0.3)]     
                     active:shadow-[inset_0.4px_1px_8px_rgba(255,255,255,0.5),0_0_8px_rgba(59,130,246,0.6)] 
                     ">
                    <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center mb-4">
                        <CheckCircle className="w-6 h-6 text-[#F59E0B]" />
                    </div>
                    <h3 className="mb-2 text-[#1F2937] font-serif font-bold">AI Suggestions + Manual Review</h3>
                    <p className="text-gray-500 text-sm font-robotoCondensed">
                        Get AI-powered recommendations and add manual bug reports
                    </p>
                </Card>
            </div>

            {/* How It Works Section */}
            <div id="how-it-works" className="mt-24 mb-24 max-w-7xl mx-auto">
                <h2 className="text-4xl text-center mb-12 text-[#1F2937] font-montserrat ">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                            1
                        </div>
                        <h3 className="mb-2 text-[#1F2937] font-serif font-bold">Enter URL</h3>
                        <p className="text-gray-600 font-robotoCondensed">
                            Simply paste your website URL and select scan options
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                            2
                        </div>
                        <h3 className="mb-2 text-[#1F2937] font-serif font-bold">AI Analysis</h3>
                        <p className="text-gray-600 font-robotoCondensed">
                            Our AI scans for bugs, security issues, and performance problems
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-[#16A34A] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                            3
                        </div>
                        <h3 className="mb-2 text-[#1F2937] font-serif font-bold">Get Report</h3>
                        <p className="text-gray-600 font-robotoCondensed">
                            Review detailed findings and export reports in multiple formats
                        </p>
                    </div>
                </div>
            </div>



        </>
    )
};

export default LandingPage;
