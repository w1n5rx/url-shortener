import {Simulate} from 'react-addons-test-utils';

export class BaseDriver {
	elem: HTMLElement;

	constructor(elem: any) {
		this.elem = elem;
	}

	private isHidden(el: any) {
		var style = window.getComputedStyle(el);
		return (style.display === 'none');
	}

	find(selector: string): Element {
		return this.elem.querySelector(selector);
	}

	findAll(selector: string): Element[] {
		const elems = this.elem.querySelectorAll(selector);
		return Array.prototype.slice.call(elems);
	}

	getAllTextBySelector(selector: string): string[] {
		return this.findAll(selector).map(e => e.textContent);
	}

	getText(selector: string): string {
		return this.find(selector).textContent;
	}

	isChildVisible(selector: string): boolean {
		return !!this.find(selector);
	}

	isVisible(): boolean {
		return this.elem ? (this.elem.offsetParent !== null && !this.isHidden(this.elem)) : false;
	}

	getAttribute(selector: string, attr: string): string {
		return this.find(selector).getAttribute(attr);
	}

	clickOn(selector: string) {
		const event = document.createEvent('HTMLEvents');
		const isBubbling = true;
		const isCancelable = false;
		event.initEvent('click', isBubbling, isCancelable);
		this.find(selector).dispatchEvent(event);
	}

	enterValue(newValue: string, selector: string) {
		const elem: HTMLInputElement = <HTMLInputElement>this.find(selector);
		elem.value = newValue;
		Simulate.change(elem);
	}
}
