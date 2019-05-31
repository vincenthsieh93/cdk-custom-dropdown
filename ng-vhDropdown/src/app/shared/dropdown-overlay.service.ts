import { Injectable, ElementRef } from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

interface DropdownConfig {
  backdropClass?: string | string[];
  hasBackdrop?: boolean;
  position?: ConnectedPosition[];
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
}

interface DropdownSource {
  origin: ElementRef;
  overlay: Overlay;
}

const DEFAULT_CONFIG: DropdownConfig = {
  backdropClass: '',
  hasBackdrop: true,
  position: [
    { offsetY: 10, originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }
  ]
};

@Injectable({
  providedIn: 'root'
})

export class DropdownOverlayService {

  constructor() { }

  /**
   * 創建下拉框
   *
   * @param {DropdownSource} src
   * @param {DropdownConfig} [config={}]
   * @returns
   * @memberof DropdownOverlayService
   */
  createDropdown(src: DropdownSource, config: DropdownConfig = {}) {
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    const overlayRef: OverlayRef = this.createOverlay(src, dialogConfig);

    overlayRef.backdropClick().subscribe(() => overlayRef.detach());

    return overlayRef;
  }

  /**
   * 下拉開關事件
   *
   * @param {OverlayRef} overlayRef
   * @param {TemplatePortal<any>} portal
   * @memberof DropdownOverlayService
   */
  toggleDropdown(overlayRef: OverlayRef, portal: TemplatePortal<any>) {
    if (overlayRef && overlayRef.hasAttached()) {
      overlayRef.detach();
    } else {
      overlayRef.attach(portal);
    }
  }

  /**
   * 創建Overlay
   *
   * @private
   * @param {DropdownSource} src
   * @param {DropdownConfig} config
   * @returns
   * @memberof DropdownOverlayService
   */
  private createOverlay(src: DropdownSource, config: DropdownConfig) {
    const overlay = src.overlay;
    const overlayConfig = this.getOverlayConfig(src, config);

    return overlay.create(overlayConfig);
  }

  /**
   * 建立設定檔
   *
   * @private
   * @param {DropdownSource} src
   * @param {DropdownConfig} config
   * @returns {OverlayConfig}
   * @memberof DropdownOverlayService
   */
  private getOverlayConfig(src: DropdownSource, config: DropdownConfig): OverlayConfig {
    const origin = src.origin;
    const overlay = src.overlay;

    const positionStrategy = overlay.position()
      .flexibleConnectedTo(origin)
      .withPositions(config.position)
      .withPush(false);

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      positionStrategy: positionStrategy,
      scrollStrategy: overlay.scrollStrategies.reposition(),
      width: config.width,
      height: config.height,
      maxWidth: config.maxWidth,
      maxHeight: config.maxHeight,
      minWidth: config.minWidth,
      minHeight: config.minHeight
    });

    return overlayConfig;
  }
}
