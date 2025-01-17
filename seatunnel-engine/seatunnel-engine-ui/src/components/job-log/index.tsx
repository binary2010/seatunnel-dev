/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { getJobLogs } from '@/service/job-log'
import type { JobLog } from '@/service/job-log/types'
import { NCollapse, NCollapseItem, NSpace } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    jobId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const logList = ref([] as JobLog[])
    getJobLogs(props.jobId).then((res) => (logList.value = res))
    return () => (
      <div class="p-6">
        <NCollapse accordion>
          {logList.value.map((log) => (
            <NCollapseItem title={log.logName}>
              <iframe src={log.logLink} width="100%" height="700px" style="border: none" />
            </NCollapseItem>
          ))}
        </NCollapse>
      </div>
    )
  }
})
