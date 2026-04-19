# 🌐 Nova Gate — Futuristic Neon Auth Portal

> A sleek, neon-themed authentication web application with interactive UI effects, smooth transitions, and full form validation — built with pure HTML5, CSS3, and JavaScript.

---

## ✨ Live Preview

> Open `index.html` directly in your browser — **no server required**.

---

## 📸 Features

| Feature | Details |
|---|---|
| 🔐 Login Form | Email + password validation with error states |
| 📝 Register Form | Full name, email, password, confirm + terms check |
| 👁️ Password Toggle | Show/hide password for both forms |
| 📊 Strength Meter | Real-time password strength indicator (5 levels) |
| ✅ Form Validation | Inline error messages with neon red highlights |
| 🎉 Success Overlay | Animated access-granted screen after submit |
| 🌌 Particle Canvas | Floating neon particle animation in background |
| 📱 Responsive | Adapts to mobile, tablet, and desktop |
| ♿ Accessible | ARIA roles, labels, keyboard-navigable |

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/nova-gate.git
cd nova-gate
```

### Run locally

Just open `index.html` in any modern browser:

```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

No build tools, no dependencies, no server needed.

---

## 📁 Project Structure

```
nova-gate/
├── index.html     # Main HTML — layout, forms, overlays
├── style.css      # All styles — neon theme, animations, responsive
├── app.js         # JavaScript — validation, interactions, particles
└── README.md      # You're here
```

---

## 🛠️ Built With

| Tool | Purpose |
|---|---|
| **HTML5** | Semantic structure, ARIA accessibility |
| **CSS3** | Custom properties, keyframe animations, grid/flex |
| **Vanilla JS** | Validation logic, DOM interactions, Canvas API |
| **Google Fonts** | Orbitron (display) + Rajdhani (body) |
| **VS Code** | Development environment |
| **Git & GitHub** | Version control and hosting |

---

## 🎨 Design System

```css
--cyan:    #00ffe5   /* Primary neon accent */
--purple:  #b400ff   /* Secondary accent    */
--pink:    #ff2d78   /* Error / alert       */
--dark-bg: #030610   /* Deep space background */
```

**Fonts:** `Orbitron` for headings/labels · `Rajdhani` for body text

---

## 🔧 Customization

### Change brand name
In `index.html`, find `.brand__name`:
```html
<span class="brand__name">NOVA GATE</span>
```

### Change accent colors
In `style.css`, update the root variables:
```css
:root {
  --cyan:   #00ffe5;
  --purple: #b400ff;
}
```

### Hook up a real backend
In `app.js`, replace the `showSuccess()` call inside `handleLogin()` / `handleRegister()` with a `fetch()` to your API endpoint:
```js
async function handleLogin(e) {
  // ... validation ...
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.success) showSuccess('ACCESS GRANTED', 'Welcome back.');
}
```

---

## 📋 Validation Rules

### Login
- Email: required, valid format
- Password: required, min 6 characters

### Register
- First & last name: required
- Email: required, valid format
- Password: required, min 8 characters
- Confirm: must match password
- Terms: must be accepted

---

## 🌟 Screenshots

> To add screenshots: take a screenshot of the app, save as `preview.png` in the root, then uncomment:

```md
![Nova Gate Preview](preview.png)
```

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [Google Fonts](https://fonts.google.com/) — Orbitron & Rajdhani
- Neon UI inspiration from cyberpunk & sci-fi aesthetics

---

<p align="center">
  Made with ⚡ and neon lights
</p>
