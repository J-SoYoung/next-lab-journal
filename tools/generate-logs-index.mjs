import fs from "fs";
import path from "path";

// 설정
const ROOT = process.cwd();
const LOGS_DIR = path.join(ROOT, "Logs");
const README_PATH = path.join(ROOT, "README.md");
const START = "<!-- LOGS:START -->";
const END = "<!-- LOGS:END -->";

// 유틸: URL 인코딩 (한글/공백 안전)
const enc = (p) => p.split("/").map(encodeURIComponent).join("/");

// 유틸: YYYY-MM-DD 접두가 있는 폴더를 날짜 기준 내림차순 정렬
const isDatePrefix = (name) => /^\d{4}-\d{2}-\d{2}/.test(name);
const byDateDesc = (a, b) => (a.name > b.name ? -1 : 1);

// Logs 내부 폴더/파일 읽기
const entries = fs.readdirSync(LOGS_DIR, { withFileTypes: true });

// 날짜 폴더만 추출
const dayFolders = entries
  .filter((e) => e.isDirectory() && isDatePrefix(e.name))
  .map((e) => ({ name: e.name, full: path.join(LOGS_DIR, e.name) }))
  .sort(byDateDesc);

  
// 각 날짜 폴더 안의 md 파일 링크 수집
const sections = dayFolders.map(({ name, full }) => {
  const files = fs
    .readdirSync(full, { withFileTypes: true })
    .filter((f) => f.isFile() && f.name.toLowerCase().endsWith(".md"))
    .map((f) => f.name)
    .sort();

  const links = files.map((fname) => {
    const rel = `./Logs/${name}/${fname}`;
    return `- [${fname.replace(/\.md$/i, "")}](${enc(rel)})`;
  });

  // 폴더 제목은 날짜 + 폴더 이름 일부를 사람이 읽기 좋게
  const humanTitle = name.replace(/_/g, " ");
  return `### ${humanTitle}\n\n${links.join("\n")}\n`;
});
