import React from 'react';
import _ from 'lodash';
import { InputNumber as AntdInputNumber } from 'antd';
import { AttributeTreeProps } from '../../types';
import styles from './index.module.less';

export const LineDash: React.FC<AttributeTreeProps> = props => {
  const { config, attributes, onChange } = props;
  const { displayName } = config;

  const value = _.get(attributes, config.attributeId);
  const dash = _.get(value, 0);
  const gap = _.get(value, 1);

  const onValueChange = (type: 'dash' | 'gap', v) => {
    let newValue =
      type === 'dash' ? _.concat([], value[1], v) : _.concat([], value[0], v);
    onChange({ [config.attributeId]: newValue });
  };

  return (
    <div className={styles.lineDash}>
      <span>{displayName}</span>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentItemLabel}>dash</span>
          <AntdInputNumber
            value={dash}
            size="small"
            style={{ width: 48 }}
            onChange={e => onValueChange('dash', e.target.value)}
          />
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentItemLabel}>gap</span>
          <AntdInputNumber
            size="small"
            value={gap}
            style={{ width: 48 }}
            onChange={e => onValueChange('gap', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
