# ⚡️ CYBERNEXUS — Official Website README

```
 ______     __  __     ______     ______     ______     __   __     ______     __  __     __  __     ______    
/\  ___\   /\ \_\ \   /\  == \   /\  ___\   /\  == \   /\ "-.\ \   /\  ___\   /\_\_\_\   /\ \/\ \   /\  ___\   
\ \ \____  \ \____ \  \ \  __<   \ \  __\   \ \  __<   \ \ \-.  \  \ \  __\   \/_/\_\/_  \ \ \_\ \  \ \___  \  
 \ \_____\  \/\_____\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_\\"\_\  \ \_____\   /\_\/\_\  \ \_____\  \/\_____\ 
  \/_____/   \/_____/   \/_____/   \/_____/   \/_/ /_/   \/_/ \/_/   \/_____/   \/_/\/_/   \/_____/   \/_____/ 
                                                                                                               
                                                                                                               

> Welcome to **CYBERNEXUS** — this repo is the club's *main website*. 

---

## 🎯 What this repo is for

* The **official** web presence for the CYBERNEXUS club.
* Hosts announcements, events, projects showcase, and member resources.
* Keep PRs small, focused, and friendly.

---

## ▶️ Quick start

```bash
npm install
npm run dev    # start dev server
npm run build  # production build
npm run preview
npm run format # run prettier
```

---

## 🧰 Formatter

* We use **Prettier**. Run `npm run format` before opening a PR.

---

## ✨ Project rules (short & sweet)

* Indent: **2 spaces**. No tabs.
* EOL: **LF**, encoding **UTF-8**.
* Variables & functions: `camelCase` (`fetchUser`).
* React components: `PascalCase` and filename match (`MyButton.jsx`).
* Hooks: `useThing` (JS hooks OK).
* Module constants: `UPPER_SNAKE_CASE` (`API_BASE_URL`).
* Folders: `kebab-case` (`user-profile`).
* No linters — keep code clean and readable; format automatically.

---


## 📁 Suggested structure

```
src/
  components/   # reusable UI (PascalCase)
  pages/        # route pages
  hooks/        # custom hooks
  utils/        # helpers
  styles/       # tailwind + globals
  assets/
```

---

## 🔧 Git & branching

* `main` = protected (production).
* Commits: short & clear. Example: `feat: add events card`.
* Keep PRs focused and add screenshots for UI changes.

---

## 🤝 Contributing

1. Fork or branch off `main`.
2. Make changes, run `npm run format`.
3. Push branch and open PR against `main` with a short description.

If you’re changing coding conventions, open an issue first so we can agree.

---

## 📬 Contact & community

* Club channels: Discord / Slack / Email (add actual links here).
* For urgent site fixes, tag the maintainers in the club channel.

---

## 📜 License

This repo uses the **MIT** license. 

---

Made with ⚡️ by the CYBERNEXUS crew — keep it curious, keep it kind. ✨

