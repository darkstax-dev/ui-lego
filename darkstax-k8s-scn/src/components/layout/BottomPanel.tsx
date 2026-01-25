import { Monitor, TrendingUp, Info, ArrowUpRight } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export function BottomPanel() {
  const { toggleStatusLegend } = useUIStore();

  return (
    <div className="w-full px-5 bg-gray-300 border-t border-gray-400 shadow-[0px_-2px_34px_-1px_rgba(12,12,13,0.1)] flex items-center justify-between" style={{ height: '72px', minHeight: '72px', maxHeight: '72px', boxSizing: 'border-box' }}>
      {/* Left Side - Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Monitor Deployment */}
        <button className="w-60 h-10 px-3 bg-gray-200 flex items-center gap-3 hover:bg-gray-400 transition-colors">
          <Monitor className="w-[18px] h-[18px] text-blue-dark-950 flex-shrink-0" />
          <span className="flex-1 text-blue-dark-950 font-macan text-sm font-book leading-tight text-left">
            Monitor Deployment
          </span>
          <ArrowUpRight className="w-5 h-5 text-blue-dark-950 flex-shrink-0" />
        </button>

        {/* Visualize Activity */}
        <button className="w-60 h-10 px-3 bg-gray-200 flex items-center gap-3 hover:bg-gray-400 transition-colors">
          <TrendingUp className="w-[18px] h-[18px] text-blue-dark-950 flex-shrink-0" />
          <span className="flex-1 text-blue-dark-950 font-macan text-sm font-book leading-tight text-left">
            Visualize activity
          </span>
          <ArrowUpRight className="w-5 h-5 text-blue-dark-950 flex-shrink-0" />
        </button>
      </div>

      {/* Right Side - Info Icon */}
      <button 
        className="w-10 h-10 bg-blue-dark-950 flex items-center justify-center hover:bg-blue-950 transition-colors relative"
        onClick={toggleStatusLegend}
      >
        <Info className="w-5 h-5 text-white" fill="white" />
        
        {/* Hand Cursor Icon */}
        <div className="absolute -top-3 -left-2 pointer-events-none">
          <svg width="35" height="38" viewBox="0 0 35 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.7734 10.845C24.5679 10.043 22.1855 9.93632 19.9225 10.5382C18.2375 10.9311 16.6009 11.5239 15.0447 12.3051L12.9696 7.99069C12.5934 7.27221 11.9604 6.73864 11.2088 6.50665C10.4572 6.27466 9.64833 6.36313 8.95902 6.75273C8.24858 7.0984 7.69804 7.72401 7.42779 8.49273C7.15754 9.26146 7.18959 10.1107 7.51692 10.8549L11.4322 18.9952L9.56729 18.3637C8.74759 18.0893 7.85759 18.1619 7.08854 18.5658C6.31949 18.9698 5.73277 19.6729 5.45444 20.5241C5.31295 20.9463 5.25397 21.3939 5.28099 21.8404C5.30801 22.2868 5.42048 22.7231 5.61175 23.1233C5.9702 23.9057 6.61069 24.5079 7.39301 24.798L13.1842 27.3848C13.9115 28.4409 14.8202 29.3466 15.8642 30.0558C16.6454 30.6125 17.5072 31.0343 18.4166 31.3052L19.1683 32.8681C19.273 33.0923 19.456 33.2659 19.6796 33.3533C19.9031 33.4408 20.1503 33.4353 20.3701 33.3381L31.2053 27.6466C31.4111 27.5202 31.5627 27.3162 31.6289 27.0766C31.6952 26.8369 31.671 26.5798 31.5614 26.3583L30.5042 24.1604C31.1188 21.4517 30.7867 18.6028 29.5679 16.1275L27.2187 11.2433C27.1187 11.0608 26.9614 10.9201 26.7734 10.845Z" fill="black"/>
            <path d="M28.0296 16.9866C29.1203 19.1247 29.4116 21.6103 28.8468 23.9603C28.7453 24.197 28.7346 24.4654 28.8171 24.7101L29.6628 26.4684L20.4245 31.3211L19.845 30.1163C19.7811 29.9829 19.6868 29.8679 19.5703 29.7815C19.4539 29.6951 19.319 29.6399 19.1773 29.6207C18.353 29.4272 17.5741 29.0632 16.8865 28.5501C15.968 27.9326 15.1807 27.1244 14.5736 26.1757C14.4805 26.0039 14.3366 25.8684 14.1634 25.7895L8.05232 23.0649C7.86558 23.0018 7.69271 22.9005 7.54373 22.7669C7.39476 22.6334 7.27266 22.4702 7.18451 22.2869C7.09636 22.1037 7.04392 21.9039 7.03024 21.6993C7.01656 21.4947 7.04191 21.2893 7.10482 21.095C7.23433 20.6963 7.5087 20.3668 7.86868 20.1777C8.22867 19.9886 8.64538 19.9551 9.02882 20.0843L12.5403 21.2989L13.7697 23.855L14.936 22.2226L9.07482 10.0365C8.9592 9.72396 8.96414 9.37671 9.0886 9.06788C9.21306 8.75906 9.44733 8.51274 9.74208 8.3808C10.0193 8.21232 10.3482 8.1628 10.6596 8.24267C10.971 8.32254 11.2406 8.52557 11.4117 8.80902L16.0317 18.4146L17.758 17.9463L15.8316 13.9413C16.4918 13.6114 17.168 13.3175 17.8573 13.0608L19.905 17.3182L21.2883 16.9485L19.1936 12.5934C19.5443 12.4907 19.9067 12.3921 20.2848 12.3057C20.7417 12.204 21.2036 12.1282 21.6684 12.0786L23.6848 16.2709L25.0681 15.9011L23.2005 12.0182C24.0882 12.0198 24.9715 12.1494 25.8252 12.4035L28.0296 16.9866Z" fill="white"/>
          </svg>
        </div>
      </button>
    </div>
  );
}
