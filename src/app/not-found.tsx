import Link from 'next/link'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { baseOptions } from '@/app/layout.config'

export default function NotFound() {
  return (
    <HomeLayout {...baseOptions}>
      <div className="docs-bg relative min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto px-6 py-12 text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-[#FFDA34] mb-4 font-mono">
              404
            </h1>
          </div>
          
          {/* Main Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-white mb-3">
                Page Not Found
              </h2>
              <p className="text-gray-300 text-lg max-w-md mx-auto">
                Sorry, the page you're looking for seems to have been moved or deleted. Use the search bar to find what you're looking for or navigate using the links below.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/"
                className="inline-flex items-center px-8 py-4 bg-[#FFDA34] text-black font-semibold rounded-xl hover:bg-[#FFE666] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Go Home
              </Link>
              
              <Link 
                href="/devs"
                className="inline-flex items-center px-8 py-4 border-2 border-[#FFDA34] text-[#FFDA34] font-semibold rounded-xl hover:bg-[#FFDA34] hover:text-black transition-all duration-200 transform hover:scale-105"
              >
                Developer Docs
              </Link>
            </div>
            
            {/* Quick Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-700">
              <p className="text-gray-400 mb-4">Quick Navigation</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                <Link 
                  href="/docs"
                  className="group p-4 rounded-lg border border-gray-700 hover:border-[#FFDA34] transition-colors duration-200"
                >
                  <div className="text-[#FFDA34] group-hover:text-white transition-colors duration-200">
                    📚
                  </div>
                  <p className="text-white text-sm font-medium mt-2">Documentation</p>
                </Link>
                
                <Link 
                  href="/devs"
                  className="group p-4 rounded-lg border border-gray-700 hover:border-[#FFDA34] transition-colors duration-200"
                >
                  <div className="text-[#FFDA34] group-hover:text-white transition-colors duration-200">
                    🚀
                  </div>
                  <p className="text-white text-sm font-medium mt-2">Build</p>
                </Link>
                
                <Link 
                  href="/general"
                  className="group p-4 rounded-lg border border-gray-700 hover:border-[#FFDA34] transition-colors duration-200"
                >
                  <div className="text-[#FFDA34] group-hover:text-white transition-colors duration-200">
                    ℹ️
                  </div>
                  <p className="text-white text-sm font-medium mt-2">Learn</p>
                </Link>
              </div>
            </div>
            
            {/* Help Text */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Can't find what you're looking for? Check out our{' '}
                <Link href="/devs/faq" className="text-[#FFDA34] hover:underline">
                  FAQ
                </Link>
                {' '}or{' '}
                <a 
                  href="https://forums.movementnetwork.xyz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#FFDA34] hover:underline"
                >
                  community forum
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}
