import React, { useEffect, useState } from 'react';
import { Spin, Layout as AntdLayout } from 'antd';
import * as _ from 'lodash';
import Layout from '../layouts/layout';
import CodeLoading from '../components/code-loading';
import { ConfigPanel } from '../components/config-panel';
import { Canvas } from '../components/canvas';
import { DARK_THEME, LIGHT_THEME } from '../theme/default';
import './index.less';

Spin.setDefaultIndicator(<CodeLoading />);

const Page = () => {
  /** 加载状态 */
  const [loading, setLoading] = useState(true);
  /** 主题 */
  const [theme, setTheme] = useState(LIGHT_THEME);

  // 初始化加载 先 loading 一下
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // 监听 黑暗主题切换
  useEffect(() => {
    const observer = new MutationObserver(([record]) => {
      if (
        record.target.nodeName === 'BODY' &&
        record.attributeName === 'data-theme'
      ) {
        const themeType = document.body.dataset.theme;
        // 注意：需要额外控制主题色
        const { colors10, colors20 } = theme;
        setTheme(
          _.merge({}, theme, themeType === 'dark' ? DARK_THEME : LIGHT_THEME, {
            colors10,
            colors20,
          })
        );
      }
    });

    observer.observe(document.body, { attributes: true });
  }, [theme]);

  /**
   * 处理配置变化, 如：seriesCount
   * @param args
   */
  const onConfigChange = (...args) => {
    console.log('config change', ...args);
  };

  /**
   * 处理主题变化
   * todo 类型定义
   * @param value
   */
  const onThemeChange = value => {
    setTheme(_.merge({}, theme, value));
  };

  return (
    <Spin spinning={loading}>
      <Layout mainStyle={{ display: 'flex', width: '100%', margin: '0 auto' }}>
        <AntdLayout.Sider collapsed={false} theme="light" width={320}>
          <ConfigPanel
            config={theme}
            onChange={onConfigChange}
            onThemeChange={onThemeChange}
          />
        </AntdLayout.Sider>
        <Canvas theme={theme} />
      </Layout>
    </Spin>
  );
};

export default Page;
