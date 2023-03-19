import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { armorcodePlugin, ArmorcodePage } from '../src/plugin';

createDevApp()
  .registerPlugin(armorcodePlugin)
  .addPage({
    element: <ArmorcodePage />,
    title: 'Root Page',
    path: '/armorcode'
  })
  .render();
