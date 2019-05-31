import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('search') search: ElementRef;
  @ViewChild('searchTooltip') searchTooltip: TemplateRef<any>;

  searchOverlayRef: OverlayRef;
  searchPortal: TemplatePortal<any>;
  searchWidth: number | string;
  selectedValue = 'Any time';
  options = [
    {value: 'Any time'},
    {value: 'Past 24 hours'},
    {value: 'Past week'},
    {value: 'Past month'}
  ];

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private dropdownOverlayService: DropdownOverlayService
  ) { }

  @HostListener('window:resize', ['$event']) onResize() {
    this.searchWidth = this.search.nativeElement.offsetWidth;
    this.searchOverlayRef.updateSize({ width: this.searchWidth });
  }

  ngOnInit() {
    this.searchWidth = this.search.nativeElement.offsetWidth;
  }

  ngAfterViewInit() {
    const ddoSrv = this.dropdownOverlayService;
    const searchSrc = { origin: this.search, overlay: this.overlay };
    const searchConfig = {
      width: this.searchWidth,
      minWidth: 509
    };

    this.searchOverlayRef = ddoSrv.createDropdown(searchSrc, searchConfig);
    this.searchPortal = new TemplatePortal(this.searchTooltip, this.viewContainerRef);
  }

  /**
   * 下拉開關事件
   *
   * @param {OverlayRef} overlayRef
   * @param {TemplatePortal<any>} portal
   * @memberof SearchComponent
   */
  ToggleDropdown(overlayRef: OverlayRef, portal: TemplatePortal<any>) {
    const ddoSrv = this.dropdownOverlayService;
    ddoSrv.toggleDropdown(overlayRef, portal);
  }
}
