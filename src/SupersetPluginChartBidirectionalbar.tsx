/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { createRef } from 'react';
import { styled } from '@superset-ui/core';
import { SupersetPluginChartBidirectionalbarProps, SupersetPluginChartBidirectionalbarStylesProps } from './types';

import { BidirectionalBar } from '@ant-design/plots';
// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles =styled.div<SupersetPluginChartBidirectionalbarStylesProps>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */



export default function SupersetPluginChartBidirectionalbar(props: SupersetPluginChartBidirectionalbarProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, height, width, shape22, metrics,groupby } = props;

  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and the useEffect hook.


  let metric=Array<String>();
  for (let dat in metrics){
    if (metrics[dat]['label']==undefined){
      metric.push(metrics[dat])
    }else{
      metric.push(metrics[dat]['label'])
    }
  }
  const config = {
    data:data,
    layout: shape22,
    xField: groupby,
    yField: metric,

    interactions: [
      {
        type: 'active-region',
      },
    ],
    tooltip: {
      shared: true,
      showMarkers: false,
    },
    height:height,
    width: width,
    autoFit: true
  };

  return (
    <Styles
      ref={rootElem}
      height={height}
      width={width}
    >
    <BidirectionalBar {...config} />
    </Styles>
  );
}
