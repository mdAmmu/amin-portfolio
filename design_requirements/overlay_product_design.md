Design Preview Overlay — UI Requirements
1. Overlay Behavior

Trigger

Opens when a user clicks a design card in the gallery.

Display Type

Centered modal overlay

Background page becomes dimmed

Overlay Background

Color: rgba(0,0,0,0.45)

Prevent background scrolling

Close Options

Close icon (top-right)

ESC key

Clicking outside modal

2. Modal Container

Width

Desktop: 1100px – 1280px

Height

Auto height (content based)

Padding

32px

Border Radius

12px

Background

#FFFFFF

Shadow

0px 20px 60px rgba(0,0,0,0.15)
3. Overlay Layout Structure

The overlay consists of three main sections.

-------------------------------------------------
| Header                                        |
-------------------------------------------------
|                                               |
|            Design Preview Image               |
|                                               |
-------------------------------------------------
| Engagement Actions (right side vertical)      |
-------------------------------------------------
4. Header Section

Located at the top of the modal.

Layout

Horizontal flex layout.

[ Logo ]   Title + Creator Info                 [Actions]   [Contact Button]
Header Height

80px

4.1 Project Title

Font:

Font Size: 26px
Weight: 600
Color: #111827

Example:

Academi – LMS Dashboard Design
4.2 Creator Info

Displayed under the title.

Elements:

• Creator logo
• Creator name
• Work availability
• Follow button

Example layout:

[logo] Musemind SaaS for Musemind
Available for work · Follow
Font
Size: 14px
Color: #6B7280
4.3 Creator Contact Info

Inline icons with text.

Example:

✉ hello@musemind.agency
📞 +8801851133270
🌐 musemind.agency

Spacing: 16px

5. Header Action Buttons

Placed on the right side.

Icons

1️⃣ Like
2️⃣ Save / Bookmark
3️⃣ Share
4️⃣ Calendar / Add

Style
Size: 40px
Border Radius: 50%
Background: #F3F4F6
Icon Size: 18px

Hover:

Background: #E5E7EB
6. Primary CTA Button

Button: Get in touch

Height: 44px
Padding: 0 20px
Background: #0F172A
Color: white
Border Radius: 22px
Font Weight: 500

Hover:

Background: #1F2937
7. Main Preview Section

Displays the large design preview image.

Container
Margin-top: 24px
Border Radius: 10px
Overflow: hidden
Background: #F9FAFB
Image
Width: 100%
Height: auto
Object-fit: contain
8. Vertical Engagement Toolbar

Located on the right side of the preview area.

Position:

Absolute
Right: -70px
Top: 40%
Buttons

1️⃣ Comment
2️⃣ Share
3️⃣ Info

Style
Size: 44px
Border Radius: 50%
Background: #FFFFFF
Border: 1px solid #E5E7EB
Shadow: 0px 6px 18px rgba(0,0,0,0.1)

Hover

Background: #F3F4F6
9. Comment Indicator

Small notification badge.

Example:

Comment icon
Badge: 37

Badge style

Background: #F43F5E
Color: white
Font size: 12px
Border Radius: 10px
Padding: 2px 6px
10. Spacing System

Use an 8px spacing scale.

Examples:

8px
16px
24px
32px
48px
11. Typography

Recommended font stack

Inter
System UI
Segoe UI
Roboto

Hierarchy:

Element	Size	Weight
Title	26px	600
Creator	16px	500
Meta text	14px	400
Buttons	14px	500
12. Animation

Overlay animation:

Fade + Scale

Duration:

200ms

Keyframes

Opacity: 0 → 1
Scale: 0.96 → 1
13. Responsive Behavior
Tablet

Width:

90%

Hide vertical toolbar.

Mobile

Convert modal to full screen sheet

Layout:

Title
Creator info
Preview image
Actions
14. Accessibility

Requirements:

• ESC closes modal
• Focus trapped inside modal
• Buttons accessible by keyboard
• ARIA labels for icons

Example:

aria-label="Like project"
15. Developer Component Structure

Example React structure.

Overlay
 ├── ModalContainer
 │    ├── Header
 │    │    ├── ProjectTitle
 │    │    ├── CreatorInfo
 │    │    ├── ContactLinks
 │    │    ├── ActionIcons
 │    │    └── GetInTouchButton
 │    │
 │    ├── PreviewImage
 │    │
 │    └── SideToolbar
 │         ├── Comment
 │         ├── Share
 │         └── Info