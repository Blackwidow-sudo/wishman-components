import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @slot Displays the slotted element as the wish (Only one HTMLElement)
 */
@customElement("wishlist-item")
export default class WishlistItem extends LitElement {
    slotted: HTMLElement | undefined

    @property({ type: String })
    wish = ""

    constructor() {
        super();

        this.setAttribute("role", "listitem");
        this.slotted = undefined
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            column-gap: 5px;

            padding: 0.3em 0.6em;
            margin: 0.3em auto;
            border-radius: 0.5em;
            border: 1px solid #ccc;

            background: var(--wm-li-background, #eee);
            color: var(--wm-li-color, #000);

            font-family: var(--wm-li-font-family);
            font-size: var(--wm-li-font-size, 16px);
        }

        .ctrl-btns {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            column-gap: 5px;
        }

        .btn {
            cursor: pointer;

            font-size: 1em;

            padding: 0.3em 0.6em;
            border: 1px solid #7171ff;
            border-radius: 0.5em;
        }
    `;

    render() {
        return html`
            <div class="wish-item">
                <slot @slotchange=${this._handleSlotting}></slot>
            </div>
            <div class="ctrl-btns">
                <button id="btn-edit" class="btn" @click=${this._handleEdit} title="Edit">
                    Edit
                </button>
                <button
                    id="btn-remove"
                    class="btn"
                    @click=${this._handleRemove}
                >
                    Remove
                </button>
            </div>
        `;
    }

    private _handleSlotting(e: Event) {
        const slottedElements = (e.target as HTMLSlotElement).assignedElements();

        if (slottedElements.length > 1) {
            console.warn("<wishlist-item />'s reactive property only considers the first slotted HTMLElement.")
        }

        if (!(slottedElements[0] instanceof HTMLElement)) {
            console.warn("<wishlist-item /> will only work if the slotted content is an HTMLElement")
            return;
        }

        const slottedElem = slottedElements[0]

        this.wish = slottedElem.textContent ? slottedElem.textContent : ""
        this.slotted = slottedElements[0];
    }

    private _handleEdit(e: Event) {
        const btn = e.target as HTMLButtonElement

        if (btn.title === "Edit") {
            this.slotted!.contentEditable = "true"
            btn.textContent = "Save"
            btn.title = "Save"
        } else {
            this.slotted!.contentEditable = "false"
            btn.textContent = "Edit"
            btn.title = "Edit"
        }
    }

    private _handleRemove() {
        this.remove()
    }
}
