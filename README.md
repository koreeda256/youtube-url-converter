# youtube-url-converter

## これは何

- YouTube LiveのURL形式を変更するWebアプリケーションです
- YouTube Liveでは、以下の3通りのURL形式が使われています（他にもあります・それらの形式は本アプリケーション未対応です）
  - 形式1: `https://youtube.com/watch?v={LiveId}`
  - 形式2: `https://www.youtube.com/live/{LiveId}`
  - 形式3: `https://www.youtu.be/{LiveId}`
- このアプリケーションを使うことで、これらのURL形式を相互変換することができます

## 背景

- Discord Watch TogetherでYouTube Liveのアーカイブを見るとき、上記の形式1, 3のURLは有効ですが、形式2のURLは無効です
- したがって、形式2のURLは、形式1（または形式3）に変換する必要があります

## 免責事項

- 諸々自己責任でお願いします
