// src/pages/CreatorPage.jsx
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function CreatorPage() {
  const [searchParams] = useSearchParams()
  const [creatorId, setCreatorId] = useState(null)
  const [isMindmapOpen, setMindmapOpen] = useState(false)

  useEffect(() => {
    const id = searchParams.get('id')
    setCreatorId(id)

    if (window.Database) {
      window.CatcherDB = new window.Database()
      window.CatcherDB.setLanguage('zh')
    }

    if (id && window.CreatorManager) {
      window.CreatorManager.renderCreatorProfile('creatorProfile', id)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* 導覽列 */}
      <nav className="fixed top-0 w-full bg-gray-800 text-white shadow z-50">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          <a href="/" className="text-lg font-bold">Catcher</a>
          <div className="space-x-4 hidden md:block">
            <a href="/" className="hover:underline">首頁</a>
            <a href="/services" className="hover:underline">服務</a>
            <a href="/creators" className="underline">創作者</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <button onClick={() => setMindmapOpen(true)} className="hover:underline">Mindmap</button>
          </div>
        </div>
      </nav>

      {/* 主內容 */}
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <button onClick={() => window.history.back()} className="mb-4 px-4 py-2 border rounded text-sm text-gray-600 hover:bg-gray-100">
            ← 返回
          </button>

          <div id="creatorProfile" className="text-center text-gray-400">載入中...</div>
        </div>
      </main>

      {/* Mindmap Overlay */}
      {isMindmapOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 text-white z-50">
          <div className="flex justify-between items-center p-4 border-b border-white/20">
            <h2 className="text-xl font-bold">Catcher 專案架構圖</h2>
            <button onClick={() => setMindmapOpen(false)} className="text-3xl">&times;</button>
          </div>
          <div className="relative w-full h-[calc(100%-4rem)]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-400 to-orange-500 text-white px-6 py-4 rounded-full shadow-lg text-lg font-semibold">
              Catcher Platform
            </div>
            <div className="absolute top-[20%] left-[15%] mindmap-node">前端介面</div>
            <div className="absolute top-[20%] right-[15%] mindmap-node">後端 API</div>
            <div className="absolute bottom-[20%] right-[15%] mindmap-node">資料庫</div>
            <div className="absolute bottom-[20%] left-[15%] mindmap-node">部署系統</div>
          </div>
        </div>
      )}

      {/* 自定義樣式 */}
      <style>{`
        .mindmap-node {
          background: linear-gradient(135deg, #667eea, #764ba2);
          padding: 0.75rem 1.25rem;
          border-radius: 9999px;
          font-weight: 500;
          text-align: center;
          min-width: 6rem;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
          color: white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        .mindmap-node:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}
