// resources/js/Components/SocialIcons.jsx

import React from 'react';

export default function SocialIcons() {
    return (
        <div className="flex items-center">
            {/* Facebook */}
            <a
                href="https://www.facebook.com/profile.php?id=61576685187426&mibextid=wwXIfr&rdid=U31VkGGWRQiflq2p&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18ZLTPdYhC%2F%3Fmibextid%3DwwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 mr-3 border-2 rounded-full border-blue-600 bg-blue-600 text-amber-50 hover:text-white  hover:border-gray-400 sm:mr-4 lg:mr-3 xl:mr-4"
            >
                <svg
                    width="16"
                    height="22"
                    viewBox="0 0 8 16"
                    className="fill-current"
                >
                    <path
                        d="M7.43902 6.4H6.19918H5.75639V5.88387V4.28387V3.76774H6.19918H7.12906C7.3726 3.76774 7.57186 3.56129 7.57186 3.25161V0.516129C7.57186 0.232258 7.39474 0 7.12906 0H5.51285C3.76379 0 2.54609 1.44516 2.54609 3.5871V5.83226V6.34839H2.10329H0.597778C0.287819 6.34839 0 6.63226 0 7.04516V8.90323C0 9.26452 0.243539 9.6 0.597778 9.6H2.05902H2.50181V10.1161V15.3032C2.50181 15.6645 2.74535 16 3.09959 16H5.18075C5.31359 16 5.42429 15.9226 5.51285 15.8194C5.60141 15.7161 5.66783 15.5355 5.66783 15.3806V10.1419V9.62581H6.13276H7.12906C7.41688 9.62581 7.63828 9.41935 7.68256 9.10968V9.08387V9.05806L7.99252 7.27742C8.01466 7.09677 7.99252 6.89032 7.85968 6.68387C7.8154 6.55484 7.61614 6.42581 7.43902 6.4Z"
                    />
                </svg>
            </a>

            {/* Instagram */}
            <a
                href="https://www.instagram.com/octopus_le_philosophe/"
                target="_blank"
                rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 mr-3 border-2 rounded-full border-rose-400 bg-gradient-to-r from-rose-700 to-amber-400 text-amber-50 hover:text-white hover:border-gray-300 sm:mr-4 lg:mr-3 xl:mr-4"            >
                <svg
                    className="fill-current"
                    viewBox="0 0 48 48"
                    width="24"
                    height="26"
                >
                    <path
                        d="M 16.5 5 C 10.16639 5 5 10.16639 5 16.5 L 5 31.5 C 5 37.832757 10.166209 43 16.5 43 L 31.5 43 C 37.832938 43 43 37.832938 43 31.5 L 43 16.5 C 43 10.166209 37.832757 5 31.5 5 L 16.5 5 z M 16.5 8 L 31.5 8 C 36.211243 8 40 11.787791 40 16.5 L 40 31.5 C 40 36.211062 36.211062 40 31.5 40 L 16.5 40 C 11.787791 40 8 36.211243 8 31.5 L 8 16.5 C 8 11.78761 11.78761 8 16.5 8 z M 34 12 C 32.895 12 32 12.895 32 14 C 32 15.105 32.895 16 34 16 C 35.105 16 36 15.105 36 14 C 36 12.895 35.105 12 34 12 z M 24 14 C 18.495178 14 14 18.495178 14 24 C 14 29.504822 18.495178 34 24 34 C 29.504822 34 34 29.504822 34 24 C 34 18.495178 29.504822 14 24 14 z M 24 17 C 27.883178 17 31 20.116822 31 24 C 31 27.883178 27.883178 31 24 31 C 20.116822 31 17 27.883178 17 24 C 17 20.116822 20.116822 17 24 17 z"/>
                </svg>
            </a>

            {/* LinkedIn */}
            <a
                href="https://www.linkedin.com/company/octopus-le-philosophe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 mr-3 border-2 rounded-full border-blue-800 bg-blue-800 text-amber-50 hover:text-white hover:border-gray-400 sm:mr-4 lg:mr-3 xl:mr-4"
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 14 14"
                    className="fill-current"
                >
                    <path
                        d="M13.0214 0H1.02084C0.453707 0 0 0.451613 0 1.01613V12.9839C0 13.5258 0.453707 14 1.02084 14H12.976C13.5432 14 13.9969 13.5484 13.9969 12.9839V0.993548C14.0422 0.451613 13.5885 0 13.0214 0ZM4.15142 11.9H2.08705V5.23871H4.15142V11.9ZM3.10789 4.3129C2.42733 4.3129 1.90557 3.77097 1.90557 3.11613C1.90557 2.46129 2.45002 1.91935 3.10789 1.91935C3.76577 1.91935 4.31022 2.46129 4.31022 3.11613C4.31022 3.77097 3.81114 4.3129 3.10789 4.3129ZM11.9779 11.9H9.9135V8.67097C9.9135 7.90323 9.89082 6.8871 8.82461 6.8871C7.73571 6.8871 7.57691 7.74516 7.57691 8.60323V11.9H5.51254V5.23871H7.53154V6.16452H7.55423C7.84914 5.62258 8.50701 5.08065 9.52785 5.08065C11.6376 5.08065 12.0232 6.43548 12.0232 8.2871V11.9H11.9779Z"
                    />
                </svg>
            </a>
        </div>
    );
}