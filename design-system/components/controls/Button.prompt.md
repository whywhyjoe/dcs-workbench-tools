Buttons and glyph-only icon buttons — one visual system, four height tiers picked by container.

```jsx
<Button variant="primary" size="lg" kbd="⌘↵"><PlayGlyph /> Run</Button>
<Button variant="soft">Add framework</Button>
<Button>Inspect</Button>
<Button variant="ghost">Cancel</Button>
<IconButton title="Refresh" size="sm"><Icon name="refresh" size={13} /></IconButton>
```

- **One** `variant="primary"` per screen. A second important action is `variant="soft"`.
- `size`: lg 28 (topbar / tool header) · md 26 (default) · sm 22 (panel heads) · xs 20 (only inside a welded Microbar).
- `variant="danger"` is hover-only red; the resting state stays neutral.
