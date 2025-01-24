import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { SelectFilter } from '../models/select-filter.model';
import { DOCUMENT, NgClass } from '@angular/common';
import { SafeHtmlSelectFilterPipe } from '../pipes/safe-html-select-filter.pipe';

@Component({
    selector: 'keo-select-filter',
    templateUrl: './keo-select-filter.container.html',
    styleUrls: ['./keo-select-filter.container.css'],
    standalone: true,
    imports: [NgClass, SafeHtmlSelectFilterPipe],
})
export class KeoSelectFilterContainer implements OnInit, OnChanges {
  @Input() disabled: boolean = false;
  @Input() placeholder: string = 'Seleccione';
  @Input() type: string = 'selectionNormal';
  @Input() data: SelectFilter[] = [];
  @Input() maxItems: number = 0;
  @Output() valor: EventEmitter<string | any[]> = new EventEmitter<string | any[]>();

  placeHolderActual: string = "";
  itemSelected: any[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit() {
    this.disabled = this.disabled != undefined ? this.disabled : false;
    this.placeholder = this.placeholder != undefined ? this.placeholder : "Seleccione";
    this.placeHolderActual = this.placeholder;

    this.document.addEventListener("click", (e: any) => {
      if (e.target.getAttribute('keo-select-filter') === null) {
        let allCloseSelect = this.document.querySelectorAll(".boxWrapperSelect__selection.active");

        allCloseSelect.forEach(item => {
          if (item != e.target) {
            item.classList.remove("active");
          }
        });
      }
    });
  }

  ngOnChanges(changes: any): void {
    if (this.type === 'selectionNormal') {
      if (changes.data.currentValue.length) {
        changes.data.currentValue.forEach((item: SelectFilter) => {
          if (item.selected === true) {
            if (item.img != undefined) {
              this.placeholder = `<img keo-select-filter style="display: block; height: 100%; margin-right: 0.35rem; object-fit: contain; object-position: center center;" src="${item.img}" alt="${item.text}"> <span keo-select-filter class="text-select-filter">${item.text}</span>`;
            } else {
              this.placeholder = `<span keo-select-filter class="text-select-filter">${item.text}</span>`;
            }
            this.valor.emit(String(item.id));
          }
        })
      }
    }
  }

  openShow(e: any) {
    e.preventDefault();
    let _nodoPrincial = e.target.parentNode;
    let elValue = e.target.parentNode.children[0];

    if (e.target) {
      if (e.target.localName === "img" || e.target.localName === "span") {
        elValue = e.target.parentNode.parentNode.children[0];
        _nodoPrincial = e.target.parentNode.parentNode;
      }
    }

    const coords = _nodoPrincial.getBoundingClientRect();
    _nodoPrincial.setAttribute("style", `--wDropDown: ${coords.width}px; --topDropDown: ${coords.y + coords.height + 5}px; --leftDropDown: ${coords.x}px;`);

    if (elValue.classList.contains('boxWrapperSelect__selection')) {
      elValue.classList.toggle('active');
    } else if (e.target.classList.contains('itemSelectionMultiple')) {
      elValue = e.target.parentNode.parentNode.children[0];
      elValue.click();
    }
  }

  countItem() {
    let x = 0;

    this.data.forEach(item => {
      if (item.selected) {
        x++;
      }
    });

    return x;
  }

  valid(v: string) {
    if (this.countItem() < this.maxItems) {
      for (let d of this.data) {
        if (d.id === v) {
          d.selected = !d.selected;
        }
      }
    } else {
      for (let d of this.data) {
        if (d.id === v) {
          d.selected = false;
        }
      }
    }
  }

  selected(e: any) {
    this.itemSelected = [];
    if (this.data.length) {
      e.preventDefault();

      if (this.type === 'selectionNormal') {
        this.valueSelectNormal(e);
      } else if (this.type === 'selectionMultiple') {
        this.valueSelectMultiple(e);
      }
    }
  }

  valueSelectNormal(e: any) {
    let value = e.target.getAttribute("value-select-filter");
    let close = e.target.parentNode.parentNode.parentNode.children[0];
    let input = e.target.parentNode.children[0].children[0];
    let reset: NodeListOf<Element> = this.document.querySelectorAll("[type-select-filter]");
    let elemt = e.target;

    if (e.target) {
      if (e.target.localName === "img" || e.target.localName === "span") {
        value = e.target.parentNode.getAttribute("value-select-filter");
        close = e.target.parentNode.parentNode.parentNode.parentNode.children[0];
        input = e.target.parentNode.parentNode.children[0].children[0];
        elemt = e.target.parentNode;
      }
    }

    this.placeholder = elemt.innerHTML;

    if (close && input) {
      if (close.classList.contains("active")) {
        input.value = "";
        close.classList.remove("active");
      }
    }

    if (reset.length) {
      this.resetElement(reset);
    }

    this.valor.emit(value);
  }

  valueSelectMultiple(e: any) {
    let value = e.target.getAttribute("value-select-filter");
    let close = e.target.parentNode.parentNode.parentNode.children[0];
    let input = e.target.parentNode.children[0].children[0];
    let reset: NodeListOf<Element> = this.document.querySelectorAll("[type-select-filter]");

    if (e.target) {
      if (e.target.localName === "img" || e.target.localName === "span") {
        value = e.target.parentNode.getAttribute("value-select-filter");
        close = e.target.parentNode.parentNode.parentNode.parentNode.children[0];
        input = e.target.parentNode.parentNode.children[0].children[0];
      }
    }

    this.placeholder = ``;

    if (e.target.classList.contains('boxSelect__item--checked')) {
      close = e.target.parentNode.parentNode.parentNode.parentNode.children[0];
      value = e.target.parentNode.getAttribute("value-select-filter");
    } else if (e.target.classList.contains('checked__circle')) {
      close = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[0];
      input = e.target.parentNode.parentNode.children[0].children[0];
      value = e.target.parentNode.parentNode.getAttribute("value-select-filter");
    }

    if (close && input) {
      input.value = "";
      close.classList.add("active");
    }

    if (reset.length) {
      this.resetElement(reset);
    }

    this.valid(value);
    this.data.forEach(d => {
      if (d.selected === true) {
        this.placeholder += `
              <span class="itemSelectionMultiple" style="position: relative; background: #e8ecec; width: calc(50% - 0.5rem); height: 22px; line-height: 22px; display: inline-block; margin-right: 0.5rem; margin-bottom: 0.5rem; overflow: hidden; white-space: pre; text-overflow: ellipsis; padding: 0 0.2rem; z-index: 5;">${d.text}</span>
            `;

        this.itemSelected.push(d);
      }
    });

    if (this.itemSelected.length === 0) {
      this.placeholder = this.placeHolderActual;
    }

    this.valor.emit(this.itemSelected);
  }

  searchFilter(e: any) {
    e.target.value = e.target.value.trimStart();
    let fistFather = e.target.parentNode;
    let secondFather = fistFather.parentNode;
    let datas = secondFather.children;
    let datas2: any[] = [];

    for (let x of datas) {
      if (!x.classList.contains("no-result")) {
        datas2.push(x);
      }
    }

    for (let el = 0; el < datas2.length; el++) {
      let noResult = secondFather.lastElementChild;
      let dataLower = datas2[el].innerText.toLowerCase();
      let obj = { data: dataLower.trim() };

      datas2[el].classList.add('no-display');
      datas2[0].classList.remove('no-display');
      noResult.classList.add('no-display');

      this.filterSearchCondicional(e, obj, el, datas2, noResult);
    }

    this.initValidSearch(e, datas2, datas, secondFather);
  }

  initValidSearch(e: any, datas2: any[], datas: any[], secondFather: any) {
    if (e.target.value != '') {
      this.initValidSearch_2(datas2, datas, secondFather);
    }

    if (e.target.value === '') {
      secondFather.lastElementChild.classList.add('no-display');
    }
  }

  private initValidSearch_2(datas2: any[], datas: any[], secondFather: any) {
    if (datas2.length) {
      let count = 0;
      for (let d of datas) {
        if (!d.classList.contains('no-display') && !d.classList.contains('noShowInput') && !d.classList.contains('no-result')) {
          count++;
        }
      }

      if (count >= 1) {
        secondFather.lastElementChild.classList.add('no-display');
      } else {
        secondFather.lastElementChild.classList.remove('no-display');
      }
    }
  }

  private filterSearchCondicional(e: any, obj: any, el: any, datas2: any[], noResult: any) {
    if (e.target.value.toLowerCase() === obj.data || e.target.value.toLowerCase() === obj.data.substr(obj.data.indexOf(' ') + 1, e.target.value.length) || e.target.value.toLowerCase() === obj.data.substr(obj.data.lastIndexOf(' ') + 1, e.target.value.length) || e.target.value.toLowerCase() === obj.data.substr(0, e.target.value.length) || e.target.value.toLowerCase() === '') {
      this.applyElementStyle(datas2[el], noResult);
    } else if (e.target.value != "") {
      this.ultimeValid(e, obj, el, datas2, noResult);
    }
  }

  private ultimeValid(e: any, obj: any, el: any, datas2: any[], noResult: any) {
    let array = obj.data.split(" ");

    if (array.length) {
      array.forEach((item: string) => {
        if (e.target.value.toLowerCase() === item.substr(0, e.target.value.length)) {
          this.applyElementStyle(datas2[el], noResult);
        }
      });
    }
  }

  private resetElement(reset: NodeListOf<Element>) {
    reset.forEach(el => {
      if (el.classList.contains("no-display")) {
        el.classList.remove("no-display");
      }
    });
  }

  private applyElementStyle(el: any, noResult: any) {
    el.classList.remove('no-display');
    noResult.classList.add('no-display');
  }
}
