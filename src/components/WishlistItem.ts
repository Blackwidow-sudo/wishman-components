import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @slot Displays the slotted element as the wish
 */
@customElement("wishlist-item")
export default class WishlistItem extends LitElement {
    @property({ type: String })
    wish = "";

    constructor() {
        super();

        this.setAttribute("role", "listitem");
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
                <button id="btn-edit" class="btn" @click=${this._handleEdit}>
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
        const slottedNodes = (e.target as HTMLSlotElement).assignedNodes();

        if (slottedNodes.length > 0) {
            slottedNodes.forEach((node) => {
                if (node instanceof Text) {
                    this.wish = node.textContent!;
                    console.log(this.wish);
                }
            });
        }
    }

    private _handleEdit(e: Event) {}

    private _handleRemove(e: Event) {}
}
