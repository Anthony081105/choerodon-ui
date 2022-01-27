import React, { Component } from 'react';
import Trigger from '../trigger';
import { placements } from './placements';

class Tooltip extends Component {
  static defaultProps = {
    prefixCls: 'rc-tooltip',
    mouseEnterDelay: 0,
    destroyTooltipOnHide: false,
    mouseLeaveDelay: 0.1,
    align: {},
    placement: 'right',
    trigger: ['hover'],
    arrowContent: null,
  };

  getPopupElement = () => {
    const { arrowContent, overlay, prefixCls, id, theme } = this.props;
    return [
      <div className={`${prefixCls}-arrow ${prefixCls}-arrow-${theme}`} key="arrow">
        {arrowContent}
      </div>,
      <div className={`${prefixCls}-inner ${prefixCls}-inner-${theme}`} key="content" id={id}>
        {typeof overlay === 'function' ? overlay() : overlay}
      </div>,
    ];
  };

  getPopupDomNode() {
    return this.trigger.getPopupDomNode();
  }

  saveTrigger = node => {
    this.trigger = node;
  };

  render() {
    const {
      overlayClassName,
      trigger,
      mouseEnterDelay,
      mouseLeaveDelay,
      overlayStyle,
      prefixCls,
      children,
      onVisibleChange,
      afterVisibleChange,
      transitionName,
      animation,
      placement,
      align,
      destroyTooltipOnHide,
      defaultVisible,
      getTooltipContainer,
      ...restProps
    } = this.props;
    const extraProps = { ...restProps };
    if ('visible' in this.props) {
      extraProps.popupVisible = this.props.visible;
    }
    return (
      <Trigger
        popupClassName={overlayClassName}
        ref={this.saveTrigger}
        prefixCls={prefixCls}
        popup={this.getPopupElement}
        action={trigger}
        builtinPlacements={placements}
        popupPlacement={placement}
        popupAlign={align}
        getPopupContainer={getTooltipContainer}
        onPopupVisibleChange={onVisibleChange}
        afterPopupVisibleChange={afterVisibleChange}
        popupTransitionName={transitionName}
        popupAnimation={animation}
        defaultPopupVisible={defaultVisible}
        destroyPopupOnHide={destroyTooltipOnHide}
        mouseLeaveDelay={mouseLeaveDelay}
        popupStyle={overlayStyle}
        mouseEnterDelay={mouseEnterDelay}
        {...extraProps}
      >
        {children}
      </Trigger>
    );
  }
}

export default Tooltip;
