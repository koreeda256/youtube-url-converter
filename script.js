/**
 * Enterキーが押されたときに変換処理を実行
 */
function handleKeyPress(event) {
  if (event.key === "Enter") {
    convertUrl();
  }
}

/**
 * YouTube URLを変換する
 */
function convertUrl() {
  const url = document.getElementById("youtubeUrl").value.trim();
  if (!url) {
    showStatusMessage("URLを入力してください", "error");
    return;
  }

  let videoId = extractVideoId(url);

  if (!videoId) {
    showStatusMessage("有効なYouTube URLを入力してください", "error");
    return;
  }

  // ステータスメッセージをクリア
  hideStatusMessage();

  // 各形式のURLを設定
  document.getElementById(
    "watchFormat"
  ).textContent = `https://www.youtube.com/watch?v=${videoId}`;
  document.getElementById(
    "liveFormat"
  ).textContent = `https://www.youtube.com/live/${videoId}`;
  document.getElementById(
    "shortFormat"
  ).textContent = `https://youtu.be/${videoId}`;

  // 結果を表示
  document.getElementById("resultContainer").classList.remove("hidden");
}

/**
 * YouTube URLからビデオIDを抽出
 * @param {string} url - YouTube URL
 * @returns {string} ビデオID、見つからない場合は空文字
 */
function extractVideoId(url) {
  if (!url || typeof url !== "string") {
    return "";
  }

  let videoId = "";

  try {
    // watch?v= 形式
    if (url.includes("watch?v=")) {
      const match = url.match(/[?&]v=([^&#]*)/);
      if (match && match[1]) {
        videoId = match[1];
      }
    }
    // live/ 形式
    else if (url.includes("/live/")) {
      const match = url.match(/\/live\/([^/?&#]*)/);
      if (match && match[1]) {
        videoId = match[1];
      }
    }
    // youtu.be 形式
    else if (url.includes("youtu.be/")) {
      const match = url.match(/youtu\.be\/([^/?&#]*)/);
      if (match && match[1]) {
        videoId = match[1];
      }
    }
    // embed/ 形式
    else if (url.includes("/embed/")) {
      const match = url.match(/\/embed\/([^/?&#]*)/);
      if (match && match[1]) {
        videoId = match[1];
      }
    }
  } catch (error) {
    console.error("URL解析エラー:", error);
    return "";
  }

  return videoId;
}

/**
 * テキストをクリップボードにコピー
 * @param {string} elementId - コピー元の要素ID
 * @param {HTMLElement} button - コピーボタン要素
 */
function copyToClipboard(elementId, button) {
  const text = document.getElementById(elementId).textContent;

  if (!text) {
    showStatusMessage("コピーするテキストがありません", "error");
    return;
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      // ボタンのテキストとスタイルを変更
      button.textContent = "コピーしました！";
      button.classList.add("copied");

      // 3秒後に元に戻す
      setTimeout(() => {
        button.textContent = "コピー";
        button.classList.remove("copied");
      }, 3000);
    })
    .catch((err) => {
      console.error("コピーに失敗しました", err);
      // フォールバック方法
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      // ボタンのテキストとスタイルを変更
      button.textContent = "コピーしました！";
      button.classList.add("copied");

      // 3秒後に元に戻す
      setTimeout(() => {
        button.textContent = "コピー";
        button.classList.remove("copied");
      }, 3000);
    });
}

/**
 * ステータスメッセージを表示
 * @param {string} message - 表示するメッセージ
 * @param {string} type - メッセージタイプ ('error' または 'info')
 */
function showStatusMessage(message, type) {
  const statusElement = document.getElementById("statusMessage");
  statusElement.textContent = message;
  statusElement.className = "status-message";
  statusElement.classList.add(type + "-message");
  statusElement.classList.remove("hidden");
  // フェードイン効果のために少し遅延を入れる
  setTimeout(() => {
    statusElement.classList.add("show");
  }, 10);

  // 3秒後に通知を非表示にする
  setTimeout(() => {
    statusElement.classList.remove("show");
    // フェードアウト完了後に非表示にする
    setTimeout(() => {
      statusElement.classList.add("hidden");
    }, 300);
  }, 3000);
}

/**
 * ステータスメッセージを非表示
 */
function hideStatusMessage() {
  const statusElement = document.getElementById("statusMessage");
  statusElement.classList.remove("show");
  // フェードアウト完了後に非表示にする
  setTimeout(() => {
    statusElement.classList.add("hidden");
  }, 300);
}

/**
 * 入力フィールドをクリア
 */
function clearInput() {
  document.getElementById("youtubeUrl").value = "";
  document.getElementById("youtubeUrl").focus();
}
