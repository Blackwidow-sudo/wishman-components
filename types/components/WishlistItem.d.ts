import { LitElement } from "lit";
/**
 * @slot Displays the slotted element as the wish (Only one TextNode/HTMLElement)
 */
export default class WishlistItem extends LitElement {
    removeHandler: EventListener;
    editHandler: EventListener;
    wish: string;
    constructor(removeHandler: EventListener, editHandler: EventListener);
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    private _handleSlotting;
    private _handleEdit;
    private _handleRemove;
}
