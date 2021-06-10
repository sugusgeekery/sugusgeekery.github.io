<template>
  <div class="design" >
    <input
      type="file"
      name="stpFile"
      id="stpFile"
      hidden="hidden"
      accept=".step, .stp, .stl"
      @change="uploadFile"
    />
    <input
      type="file"
      name="imageFile"
      id="imageFile"
      hidden="hidden"
      accept="image/*"
      @change="uploadFile"
    />
    <div
      class="design-item"
      v-for="(a, b) in design.designList"
      :key="'_方案设计_' + b"
    >
      <div class="design-item-title">
        <span class="design-item-title-black">{{ a.title }}</span>
        <span class="design-item-title-gray design-item-title-left">{{ a.ext }}</span>
      </div>
      <div class="design-cells">

        <div class="design-cell" >
          <div class="design-cell-title" v-if="a.stepId === '1'">
            <div class="design-cell-text">
              <span class="design-cell-text-black">3D图纸方案</span>
              <span class="design-cell-text-left" v-if="a.uploadType === 1 || a.uploadType === 3" @click="selectFile(1, { b, d: -1, status: 1 })">
                <img class="design-cell-text-image" src="../../../../assets/images/upload_blue.png" alt="" />
                <span class="design-cell-text-blue">上传文件</span>
              </span>
              <span class="design-cell-text-left" v-else-if="a.uploadType === 2">
                <img class="design-cell-text-image" src="../../../../assets/images/upload_gray.png" alt="" />
                <span class="design-cell-text-gray">上传文件</span>
              </span>
            </div>
            <div class="design-cell-text" v-if="a.uploadType === 10">
              <span class="design-cell-text-gray">等待设计方导入</span>
            </div>
          </div>
          <div class="design-cell-title" v-if="a.stepId === '2'">
            <div class="design-cell-text">
              <span class="design-cell-text-black">BOM表</span>
              <span class="design-cell-text-left" v-if="a.uploadType === 1" @click="updateBOMInfo({ b, editType: 1 })">
                <img class="design-cell-text-image" src="../../../../assets/images/import.png" alt="" />
                <span class="design-cell-text-blue">导入BOM表</span>
              </span>
              <span class="design-cell-text-left" v-else-if="a.uploadType === 4" @click="updateBOMInfo({ b, editType: 1 })">
                <img class="design-cell-text-image" src="../../../../assets/images/update.png" alt="" />
                <span class="design-cell-text-blue">更新BOM表</span>
              </span>
              <span class="design-cell-text-left" v-else-if="a.uploadType === 2" @click="updateBOMInfo({ b, editType: 2 })">
                <img class="design-cell-text-image" src="../../../../assets/images/enlarge.png" alt="" />
                <span class="design-cell-text-blue">查看BOM表</span>
              </span>
              <span class="design-cell-text-left" v-else-if="a.uploadType === 3" @click="updateBOMInfo({ b, editType: 1 })">
                <img class="design-cell-text-image" src="../../../../assets/images/update.png" alt="" />
                <span class="design-cell-text-blue">更新BOM表</span>
              </span>
              <span class="design-cell-text-left" v-else-if="a.uploadType === 11" @click="updateBOMInfo({ b, editType: 1 })">
                <img class="design-cell-text-image" src="../../../../assets/images/enlarge.png" alt="" />
                <span class="design-cell-text-blue">审核BOM表</span>
              </span>
              <span class="design-cell-text-left" v-else-if="a.uploadType === 12" @click="updateBOMInfo({ b, editType: 2 })">
                <img class="design-cell-text-image" src="../../../../assets/images/enlarge.png" alt="" />
                <span class="design-cell-text-blue">查看BOM表</span>
              </span>
            </div>
            <div class="design-cell-text" v-if="a.uploadType === 10">
              <span class="design-cell-text-gray">等待设计方导入</span>
            </div>
          </div>
          <div class="design-list">
            <div class="design-li" v-for="(c, d) in a.versionInfoList" :key="b + '_3D图纸_' + d" v-show="a.versionInfoList && a.versionInfoList.length">
              <div class="design-li-box" :class="{'design-li-box-active': d === a.versionInfoIndex && !(a.fileList && a.fileList.length) }">
                <div class="design-li-box-header" v-if="a.versionInfoList.length > 1 && d === a.versionInfoList.length - 1">new</div>
                <div class="design-li-box-content" :class="{'design-li-box-content-mask': d !== a.versionInfoList.length - 1 }" @click="updateVersionIndex({ b, d, status: 1 })">
                  <img class="design-li-box-content-icon" v-if="a.stepId === '1'" src="../../../../assets/images/file_icon_2.png" alt="">
                  <img class="design-li-box-content-icon" v-else-if="a.stepId === '2'" src="../../../../assets/images/file_icon_1.png" alt="">
                  <div class="design-li-box-content-text">{{ c.fileName }}</div>
                </div>
                <div class="design-li-box-footer" v-if="c.filePath" @click="downloadFile(BASE_IMAGE_URL + c.filePath, c.fileName)">下载</div>
              </div>
              <div class="design-li-text">{{ c.updateTime }}</div> 
            </div>
            <div class="design-li" v-for="(c, d) in a.fileList" :key="b + '新增3D图纸_' + d" v-show="a.fileList && a.fileList.length">
              <div class="design-li-box design-li-box-active">
                <div class="design-li-box-content">
                  <img class="design-li-box-content-icon" v-if="a.stepId === '1'" src="../../../../assets/images/file_icon_2.png" alt="">
                  <img class="design-li-box-content-icon" v-else-if="a.stepId === '2'" src="../../../../assets/images/file_icon_1.png" alt="">
                  <div class="design-li-box-content-text">{{ c.fileName }}</div>
                </div>
              </div>
            </div>
            <div class="design-li" v-if="a.fileList && a.fileList.length">
              <div class="design-li-buttons">
                <div class="design-li-button design-li-button-blue" @click="commitFile({ b, status: 1 })">提交</div>
              </div>
            </div>
          </div>
          <div class="design-col" v-if="a.versionInfoList && a.versionInfoList[a.versionInfoIndex] && a.versionInfoList[a.versionInfoIndex].allApprovalInfoList && a.versionInfoList[a.versionInfoIndex].allApprovalInfoList.length">
            <div class="design-row" v-for="(c, d) in a.versionInfoList[a.versionInfoIndex].allApprovalInfoList" :key="b + '_3D图纸审批_' + d">
              <div class="design-row-label" v-if="c.type === '0'">设计方：</div>
              <div class="design-row-label" v-else-if="c.type === '1'">加工方：</div>
              <div class="design-row-label" v-else-if="c.type === '2'">试模方：</div>
              <div class="design-row-content">
                <div class="design-row-content-text" v-if="a.stepId === '1' && c.editType === 1">
                  <span class="design-row-content-text-circle" :class="{'design-row-content-text-circle-active': c.opinion === 1}" @click="updateOpinion({ b, d, status: 1, value: 1 })"></span>
                  <span class="design-row-content-text-black" @click="updateOpinion({ b, d, status: 1, value: 1 })">确认</span>
                  <span class="design-row-content-text-circle design-row-content-text-left" :class="{'design-row-content-text-circle-active': c.opinion === 0}" @click="updateOpinion({ b, d, status: 1, value: 0 })"></span>
                  <span class="design-row-content-text-black" @click="updateOpinion({ b, d, status: 1, value: 0 })">驳回</span>
                </div>
                <div class="design-row-content-text" v-else-if="c.opinion === 0" @click="getReasonContent({ content: c.cause, fileList: c.approvalIds })">
                  <span class="design-row-content-text-red">已驳回</span>
                  <img class="design-row-content-text-icon design-row-content-text-left" src="../../../../assets/images/enlarge.png" />
                  <span class="design-row-content-text-blue">查看原因</span>
                </div>
                <div class="design-row-content-text" v-else-if="c.opinion === 1">
                  <span class="design-row-content-text-blue">通过</span>
                </div>
                <div class="design-row-content-text" v-else>
                  <span class="design-row-content-text-gray">待审核</span>
                </div>
                <div class="form-container" v-if="a.stepId === '1' && c.editType === 1" @keydown="fileParams = { b, d, status: 1 }">
                  <div class="form-wrapper">
                    <div class="form-content">
                      <div class="form-textarea">
                        <textarea
                          :value="c.cause"
                          :placeholder="`请填写${c.opinion === 0 ? '驳回' : c.opinion === 1 ? '通过' : ''}原因`"
                          cols="30"
                          rows="10"
                          @change="
                            updateCause({ b, d, status: 1, value: $event.target.value })
                          "
                        ></textarea>
                      </div>
                      <div class="form-list">
                        <div class="form-li" v-for="(e, f) in c.reasonFiles" :key="b + '_3D图纸审批_' + d + '_原因_' + f">
                          <div class="form-li-text">{{ e.fileName }}</div>
                          <div class="form-li-del" @click="deleteReasonFile({ b, d, f, status: 1 })">+</div> 
                        </div>
                      </div>
                    </div>
                    <div class="form-add" @click="selectFile(2, { b, d, status: 1 })">
                      <img class="form-add-img" src="../../../../assets/images/pictrue_add.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="design-row-content-buttons" v-if="a.stepId === '1' && c.editType === 1">
                  <span class="design-row-content-button design-row-content-button-blue" @click="approvalDesign({ b, d, status: 1 })">提交</span>
                </div>
              </div>
            </div>
          </div>
          <div class="design-cell-text" v-if="a.versionInfoList[a.versionInfoIndex] && a.versionInfoList[a.versionInfoIndex].approveStatus === 1">
            <span class="design-cell-text-blue">方案正在审核中，不可上传更新</span>
          </div>
          <div class="design-cell-text" v-else-if="a.versionInfoList[a.versionInfoIndex] && a.versionInfoList[a.versionInfoIndex].approveStatus === 2">
            <span class="design-cell-text-gray">方案被驳回，请重新上传文件提交审核</span>
          </div>
          <div class="design-cell-text" v-if="a.stepId === '1' && a.hotRunner === 0 && a.update3D === 1">
            <span class="design-cell-text-red">BOM表被驳回需修改3D图纸，请重新上传文件提交审核</span>
            <!-- <span class="design-cell-text-left">
              <img class="design-cell-text-image" src="../../../../assets/images/enlarge.png" alt="" />
              <span class="design-cell-text-blue">查看原因</span>
            </span> -->
          </div>
          <div class="design-cell-text" v-else-if="a.stepId === '2' && a.update3D === 1">
            <span class="design-cell-text-red">BOM表被驳回且需修改3D图纸，请检查并更新</span>
          </div>
        </div> 

        <div class="design-cell" v-if="a.stepId === '1' && a.uploadHotrunnerType > 0">
          <div class="design-cell-title">
            <div class="design-cell-text">
              <span class="design-cell-text-black">热流道图纸</span>
              <span class="design-cell-text-left" v-if="a.uploadHotrunnerType === 1" @click="selectFile(1, { b, d: -1, status: 2 })">
                <img class="design-cell-text-image" src="../../../../assets/images/upload_blue.png" alt="" />
                <span class="design-cell-text-blue">上传文件</span>
              </span>
              <span class="design-cell-text-left" v-else-if="a.uploadHotrunnerType === 2">
                <img class="design-cell-text-image" src="../../../../assets/images/upload_gray.png" alt="" />
                <span class="design-cell-text-gray">上传文件</span>
              </span>
            </div>
            <div class="design-cell-text" v-if="a.uploadHotrunnerType === 10">
              <span class="design-cell-text-gray">等待热流道供应商上传图纸</span>
            </div>
          </div>
          <div class="design-list">
            <div class="design-li" v-for="(c, d) in a.hotRunnerInfoList" :key="b + '_热流道图纸_' + d" v-show="a.hotRunnerInfoList && a.hotRunnerInfoList.length">
              <div class="design-li-box" :class="{'design-li-box-active': d === a.hotRunnerInfoIndex && !(a.hotRunnerFileList && a.hotRunnerFileList.length) }">
                <div class="design-li-box-header" v-if="a.hotRunnerInfoList.length > 1 && d === a.hotRunnerInfoList.length - 1">new</div>
                <div class="design-li-box-content" :class="{'design-li-box-content-mask': d !== a.hotRunnerInfoList.length - 1 }" @click="updateVersionIndex({ b, d, status: 2 })">
                  <img class="design-li-box-content-icon" v-if="a.stepId === '1'" src="../../../../assets/images/file_icon_2.png" alt="">
                  <img class="design-li-box-content-icon" v-else-if="a.stepId === '2'" src="../../../../assets/images/file_icon_1.png" alt="">
                  <div class="design-li-box-content-text">{{ c.fileName }}</div>
                </div>
                <div class="design-li-box-footer" v-if="c.filePath" @click="downloadFile(BASE_IMAGE_URL + c.filePath, c.fileName)">下载</div>
              </div>
              <div class="design-li-text">{{ c.updateTime }}</div> 
            </div>
            <div class="design-li" v-for="(c, d) in a.hotRunnerFileList" :key="b + '_新增热流道图纸_' + d" v-show="a.hotRunnerFileList && a.hotRunnerFileList.length">
              <div class="design-li-box design-li-box-active">
                <div class="design-li-box-content">
                  <img class="design-li-box-content-icon" v-if="a.stepId === '1'" src="../../../../assets/images/file_icon_2.png" alt="">
                  <img class="design-li-box-content-icon" v-else-if="a.stepId === '2'" src="../../../../assets/images/file_icon_1.png" alt="">
                  <div class="design-li-box-content-text">{{ c.fileName }}</div>
                </div>
              </div>
            </div>
            <div class="design-li" v-if="a.hotRunnerFileList && a.hotRunnerFileList.length">
              <div class="design-li-buttons">
                <div class="design-li-button design-li-button-blue" @click="commitFile({ b, status: 2 })">提交</div>
              </div>
            </div>
          </div>
          <div class="design-col" v-if="a.hotRunnerInfoList && a.hotRunnerInfoList[a.hotRunnerInfoIndex] && a.hotRunnerInfoList[a.hotRunnerInfoIndex].allApprovalInfoList && a.hotRunnerInfoList[a.hotRunnerInfoIndex].allApprovalInfoList.length">
            <div class="design-row" v-for="(c, d) in a.hotRunnerInfoList[a.hotRunnerInfoIndex].allApprovalInfoList" :key="b + '_热流道图纸审批_' + d">
              <div class="design-row-label" v-if="c.type === '0'">设计方：</div>
              <div class="design-row-label" v-else-if="c.type === '1'">加工方：</div>
              <div class="design-row-label" v-else-if="c.type === '2'">试模方：</div>
              <div class="design-row-content">
                <!-- <div class="design-row-content-text" v-if="c.editType === 1">
                  <span class="design-row-content-text-circle" :class="{'design-row-content-text-circle-active': c.opinion === 1}" @click="updateOpinion({ b, d, status: 2, value: 1 })"></span>
                  <span class="design-row-content-text-black" @click="updateOpinion({ b, d, status: 2, value: 1 })">确认</span>
                  <span class="design-row-content-text-circle design-row-content-text-left" :class="{'design-row-content-text-circle-active': c.opinion === 0}" @click="updateOpinion({ b, d, status: 2, value: 0 })"></span>
                  <span class="design-row-content-text-black" @click="updateOpinion({ b, d, status: 2, value: 0 })">驳回</span>
                </div> -->
                <div class="design-row-content-text" v-if="c.editType === 1">
                  <span class="design-row-content-text-gray">热流道图纸已上传，请及时更新3D图纸方案</span>
                  <span class="design-row-content-text-blue design-row-content-text-left" @click="updateOpinion({ b, d, status: 2, value: 0 })">驳回图纸</span>
                </div>
                <div class="design-row-content-text" v-else-if="c.opinion === 0" @click="getReasonContent({ content: c.cause, fileList: c.approvalIds })">
                  <span class="design-row-content-text-red">已驳回</span>
                  <img class="design-row-content-text-icon design-row-content-text-left" src="../../../../assets/images/enlarge.png" />
                  <span class="design-row-content-text-blue">查看原因</span>
                </div>
                <div class="design-row-content-text" v-else-if="c.opinion === 1">
                  <span class="design-row-content-text-blue">通过</span>
                </div>
                <div class="design-row-content-text" v-else>
                  <span class="design-row-content-text-gray">待审核</span>
                </div>
                <div class="form-container" v-if="c.editType === 1 && (c.opinion === 0 || c.opinion === 1)" @keydown="fileParams = { b, d, status: 2 }">
                  <div class="form-wrapper">
                    <div class="form-content">
                      <div class="form-textarea">
                        <textarea
                          :value="c.cause"
                          :placeholder="`请填写${c.opinion === 0 ? '驳回' : c.opinion === 1 ? '通过' : ''}原因`"
                          cols="30"
                          rows="10"
                          @change="
                            updateCause({ b, d, status: 2, value: $event.target.value })
                          "
                        ></textarea>
                      </div>
                      <div class="form-list">
                        <div class="form-li" v-for="(e, f) in c.reasonFiles" :key="b + '_热流道图纸审批_' + d + '_原因_' + f">
                          <div class="form-li-text">{{ e.fileName }}</div>
                          <div class="form-li-del" @click="deleteReasonFile({ b, d, f, status: 2 })">+</div> 
                        </div>
                      </div>
                    </div>
                    <div class="form-add" @click="selectFile(2, { b, d, status: 2 })">
                      <img class="form-add-img" src="../../../../assets/images/pictrue_add.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="design-row-content-buttons" v-if="c.editType === 1 && (c.opinion === 0 || c.opinion === 1)">
                  <span class="design-row-content-button design-row-content-button-blue" @click="approvalDesign({ b, d, status: 2 })">提交</span>
                </div>
              </div>
            </div>
          </div>
          <div class="design-cell-text" v-if="a.hotRunnerInfoList && a.hotRunnerInfoList[a.hotRunnerInfoIndex] && a.hotRunnerInfoList[a.hotRunnerInfoIndex].approveStatus === 1">
            <span class="design-cell-text-blue">文件已提交，请等待设计方审核</span>
          </div>
          <div class="design-cell-text" v-else-if="a.hotRunnerInfoList && a.hotRunnerInfoList[a.hotRunnerInfoIndex] && a.hotRunnerInfoList[a.hotRunnerInfoIndex].approveStatus === 2">
            <span class="design-cell-text-gray">文件被驳回，请重新上传文件提交审核</span>
          </div>
          <div class="design-cell-text" v-if="a.hotRunner === 1 && a.update3D === 1 && !(a.hotRunnerInfoList && a.hotRunnerInfoList.length)">
            <span class="design-cell-text-red">BOM表被驳回需修改3D图纸，请重新上传文件提交审核</span>
            <!-- <span class="design-cell-text-left">
              <img class="design-cell-text-image" src="../../../../assets/images/enlarge.png" alt="" />
              <span class="design-cell-text-blue">查看原因</span>
            </span> -->
          </div>
        </div> 

        <div class="design-cell" v-if="a.stepId === '1' && a.uploadHotrunner3dType > 0">
          <div class="design-cell-title">
            <div class="design-cell-text">
              <span class="design-cell-text-black">3D图纸方案(含热流道)</span>
              <span class="design-cell-text-left" v-if="a.uploadHotrunner3dType === 1 || a.uploadHotrunner3dType === 3" @click="selectFile(1, { b, d: -1, status: 3 })">
                <img class="design-cell-text-image" src="../../../../assets/images/upload_blue.png" alt="" />
                <span class="design-cell-text-blue">上传文件</span>
              </span>
              <span class="design-cell-text-left" v-else-if="a.uploadHotrunner3dType === 2">
                <img class="design-cell-text-image" src="../../../../assets/images/upload_gray.png" alt="" />
                <span class="design-cell-text-gray">上传文件</span>
              </span>
            </div>
            <div class="design-cell-text" v-if="a.uploadHotrunner3dType === 10">
              <span class="design-cell-text-gray">等待设计方上传图纸</span>
            </div>
          </div>
          <div class="design-list">
            <div class="design-li" v-for="(c, d) in a.hotRunnerVersionInfoList" :key="b + '_3D含热流道图纸_' + d" v-show="a.hotRunnerVersionInfoList && a.hotRunnerVersionInfoList.length">
              <div class="design-li-box" :class="{'design-li-box-active': d === a.hotRunnerVersionInfoIndex && !(a.hotRunner3dFileList && a.hotRunner3dFileList.length) }">
                <div class="design-li-box-header" v-if="a.hotRunnerVersionInfoList.length > 1 && d === a.hotRunnerVersionInfoList.length - 1">new</div>
                <div class="design-li-box-content" :class="{'design-li-box-content-mask': d !== a.hotRunnerVersionInfoList.length - 1 }" @click="updateVersionIndex({ b, d, status: 3 })">
                  <img class="design-li-box-content-icon" src="../../../../assets/images/file_icon_2.png" alt="">
                  <div class="design-li-box-content-text">{{ c.fileName }}</div>
                </div>
                <div class="design-li-box-footer" v-if="c.filePath" @click="downloadFile(BASE_IMAGE_URL + c.filePath, c.fileName)">下载</div>
              </div>
              <div class="design-li-text">{{ c.updateTime }}</div> 
            </div>
            <div class="design-li" v-for="(c, d) in a.hotRunner3dFileList" :key="b + '_新增3D含热流道图纸_' + d" v-show="a.hotRunner3dFileList && a.hotRunner3dFileList.length">
              <div class="design-li-box design-li-box-active">
                <div class="design-li-box-content">
                  <img class="design-li-box-content-icon" v-if="a.stepId === '1'" src="../../../../assets/images/file_icon_2.png" alt="">
                  <img class="design-li-box-content-icon" v-else-if="a.stepId === '2'" src="../../../../assets/images/file_icon_1.png" alt="">
                  <div class="design-li-box-content-text">{{ c.fileName }}</div>
                </div>
              </div>
            </div>
            <div class="design-li" v-if="a.hotRunner3dFileList && a.hotRunner3dFileList.length">
              <div class="design-li-buttons">
                <div class="design-li-button design-li-button-blue" @click="commitFile({ b, status: 3 })">提交</div>
              </div>
            </div>
          </div>
          <div class="design-col" v-if="a.hotRunnerVersionInfoList && a.hotRunnerVersionInfoList[a.hotRunnerVersionInfoIndex] && a.hotRunnerVersionInfoList[a.hotRunnerVersionInfoIndex].allApprovalInfoList && a.hotRunnerVersionInfoList[a.hotRunnerVersionInfoIndex].allApprovalInfoList.length">
            <div class="design-row" v-for="(c, d) in a.hotRunnerVersionInfoList[a.hotRunnerVersionInfoIndex].allApprovalInfoList" :key="b + '_3D含热流道图纸审批_' + d">
              <div class="design-row-label" v-if="c.type === '0'">设计方：</div>
              <div class="design-row-label" v-else-if="c.type === '1'">加工方：</div>
              <div class="design-row-label" v-else-if="c.type === '2'">试模方：</div>
              <div class="design-row-content">
                <div class="design-row-content-text" v-if="c.editType === 1">
                  <span class="design-row-content-text-circle" :class="{'design-row-content-text-circle-active': c.opinion === 1}" @click="updateOpinion({ b, d, status: 3, value: 1 })"></span>
                  <span class="design-row-content-text-black" @click="updateOpinion({ b, d, status: 3, value: 1 })">确认</span>
                  <span class="design-row-content-text-circle design-row-content-text-left" :class="{'design-row-content-text-circle-active': c.opinion === 0}" @click="updateOpinion({ b, d, status: 3, value: 0 })"></span>
                  <span class="design-row-content-text-black" @click="updateOpinion({ b, d, status: 3, value: 0 })">驳回</span>
                </div>
                <div class="design-row-content-text" v-else-if="c.opinion === 0" @click="getReasonContent({ content: c.cause, fileList: c.approvalIds })">
                  <span class="design-row-content-text-red">已驳回</span>
                  <img class="design-row-content-text-icon design-row-content-text-left" src="../../../../assets/images/enlarge.png" />
                  <span class="design-row-content-text-blue">查看原因</span>
                </div>
                <div class="design-row-content-text" v-else-if="c.opinion === 1">
                  <span class="design-row-content-text-blue">通过</span>
                </div>
                <div class="design-row-content-text" v-else>
                  <span class="design-row-content-text-gray">待审核</span>
                </div>
                <div class="form-container" v-if="c.editType === 1" @keydown="fileParams = { b, d, status: 3 }">
                  <div class="form-wrapper">
                    <div class="form-content">
                      <div class="form-textarea">
                        <textarea
                          :value="c.cause"
                          :placeholder="`请填写${c.opinion === 0 ? '驳回' : c.opinion === 1 ? '通过' : ''}原因`"
                          cols="30"
                          rows="10"
                          @change="
                            updateCause({ b, d, status: 3, value: $event.target.value })
                          "
                        ></textarea>
                      </div>
                      <div class="form-list">
                        <div class="form-li" v-for="(e, f) in c.reasonFiles" :key="b + '_3D含热流道图纸审批_' + d + '_原因_' + f">
                          <div class="form-li-text">{{ e.fileName }}</div>
                          <div class="form-li-del" @click="deleteReasonFile({ b, d, f, status: 3 })">+</div> 
                        </div>
                      </div>
                    </div>
                    <div class="form-add" @click="selectFile(2, { b, d, status: 3 })">
                      <img class="form-add-img" src="../../../../assets/images/pictrue_add.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="design-row-content-buttons" v-if="c.editType === 1">
                  <span class="design-row-content-button design-row-content-button-blue" @click="approvalDesign({ b, d, status: 3 })">提交</span>
                </div>
              </div>
            </div>
          </div>
          <div class="design-cell-text" v-if="a.hotRunnerVersionInfoList && a.hotRunnerVersionInfoList[a.hotRunnerVersionInfoIndex] && a.hotRunnerVersionInfoList[a.hotRunnerVersionInfoIndex].approveStatus === 1">
            <span class="design-cell-text-blue">方案正在审核中，不可上传更新</span>
          </div>
          <div class="design-cell-text" v-else-if="a.hotRunnerVersionInfoList && a.hotRunnerVersionInfoList[a.hotRunnerVersionInfoIndex] && a.hotRunnerVersionInfoList[a.hotRunnerVersionInfoIndex].approveStatus === 2">
            <span class="design-cell-text-gray">文件被驳回，请重新上传文件提交审核</span>
          </div>
          <div class="design-cell-text" v-if="a.hotRunner === 1 && a.update3D === 1 && a.hotRunnerInfoList.length">
            <span class="design-cell-text-red">BOM表被驳回需修改3D图纸，请重新上传文件提交审核</span>
            <!-- <span class="design-cell-text-left">
              <img class="design-cell-text-image" src="../../../../assets/images/enlarge.png" alt="" />
              <span class="design-cell-text-blue">查看原因</span>
            </span> -->
          </div>
        </div> 
      </div>
    </div>
    <BOMInfo></BOMInfo>
    <ReasonContent :data="reasonContent" @updateData="updateReasonContent"></ReasonContent>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch, onMounted, onUnmounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";

import { Supplier } from "@/store/modules/order/state";
import { InitInfo, Design } from "@/store/modules/order/modules/design/state";
import { ActionTypes } from "@/store/modules/order/modules/design/actions";
import { MutationTypes } from "@/store/modules/order/modules/design/mutations";

import downloadByUrl from "@/utils/downloadByUrl";
import Upload from "@/api/upload";

import { BASE_IMAGE_URL } from "@/config";

import BOMInfo from "./components/BOMInfo.vue";
import ReasonContent from "@/components/models/ReasonContent.vue";

export default defineComponent({
  name: "DesignView",
  components: {
    BOMInfo,
    ReasonContent
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const initInfo: InitInfo | any = computed(() => store.state.order.design.initInfo);
    const design: Design | any = computed(() => store.state.order.design.design);
    const reasonContent: ReasonContentTypes | any = computed(() => store.state.order.design.reasonContent);

    const getDesignList: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.GetDesignList}`, params);
    const updateVersionIndex: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.UpdateVersionIndex}`, params);
    const updateOpinion: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.UpdateOpinion}`, params);
    const updateCause: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.UpdateCause}`, params);
    const addReasonFile: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.AddReasonFile}`, params);
    const deleteReasonFile: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.DeleteReasonFile}`, params);
    const updateFileList: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.UpdateFileList}`, params);
    const commitFile: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.CommitFile}`, params);
    const approvalDesign: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.ApprovalDesign}`, params);
    const updateBOMInfo: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.UpdateBOMInfo}`, params);
    const getReasonContent: Function = (params: any) => store.dispatch(`order/design/${ActionTypes.GetReasonContent}`, params);

    const updateReasonContent: Function = (params: any) => store.commit(`order/design/${MutationTypes.UpdateReasonContent}`, params);

    const fileType: Ref<number> = ref(0);
    const fileParams = reactive({
      b: -1,
      d: -1,
      status: 0
    });

    const selectFile = (ft: number, fp: { b: number, d: number; status: number; }) => {
      const { b, d, status } = fp;
      fileType.value = ft;
      fileParams.b = b;
      fileParams.d = d;
      fileParams.status = status;
      if (fileType.value === 1) {
        const dom: any = document.querySelector("#stpFile");
        dom.click();
      } else if (fileType.value === 2) {
        const dom: any = document.querySelector("#imageFile");
        dom.click();
      }
    }
    const uploadFile = async (e: any) => {
      const files = e.target.files;
      const fileList: any = await Upload({ files });
      for (const v of fileList) {
        updateFile(v);
      }
      e.target.value = null;
    }
    const updateFile = (e: any) => {
      if (fileType.value === 1) {
        // 上传3d图纸
        updateFileList({ ...fileParams, value: e })
      } else if (fileType.value === 2) {
        // 上传审批原因图片
        addReasonFile({ ...fileParams, value: e })
      }
    }

    // 当前方案设计页面的粘贴事件只针对审批原因图片有效
    const handlePaste = async (e: any) => {
      const { b = -1, d = -1, status = 0 } = fileParams;
      const { designList } = design;
      if (status === 1) {
        const { versionInfoIndex = -1, versionInfoList = [] } = designList[b] || {};
        const { allApprovalInfoList = [] } = versionInfoList[versionInfoIndex] || {};
        const { editType = 0 } = allApprovalInfoList[d] || {};
        if (!editType) return;
      } else if (status === 2) {
        const { hotRunnerInfoIndex = -1, hotRunnerInfoList = [] } = designList[b] || {};
        const { allApprovalInfoList = [] } = hotRunnerInfoList[hotRunnerInfoIndex] || {};
        const { editType = 0 } = allApprovalInfoList[d] || {};
        if (!editType) return;
      } else if (status === 3) {
        const { hotRunnerVersionInfoIndex = -1, hotRunnerVersionInfoList = [] } = designList[b] || {};
        const { allApprovalInfoList = [] } = hotRunnerVersionInfoList[hotRunnerVersionInfoIndex] || {};
        const { editType = 0 } = allApprovalInfoList[d] || {};
        if (!editType) return;
      }
      const { clipboardData } = e || window;
      const { items } = clipboardData || {};
      if (!(items && items.length)) {
          return ;
      }

      const uploadFile = async (file: any) => {
        const fileList: any = await Upload({ files: [file]});
        for (const v of fileList) {
          updateFile(v);
        }
      };

      for (let i = 0, len = items.length; i < len; i++) {
        const { type } = items[i];
        if (type.includes("image")) {
          const file = items[i].getAsFile();
          if (file) {
            uploadFile(file);
          }
          break;
        } else {
          items[i].getAsString((str: string) => {
            if (str) {
              updateCause({ ...fileParams, value: str, isPaste: true });
            }
          });
          break;
        }
      }
    }

    const downloadFile = (url: string, name: string) => {
      if (url) {
        downloadByUrl(url, name);
      }
    }

    getDesignList();

    onMounted(() => {
      document.addEventListener("paste", handlePaste);
    })
    onUnmounted(() => {
      document.removeEventListener("paste", handlePaste);
    })
    
    return {
      BASE_IMAGE_URL,
      Supplier,
      initInfo,
      design,
      reasonContent,
      getDesignList,
      updateVersionIndex,
      updateOpinion,
      updateCause,
      addReasonFile,
      deleteReasonFile,
      updateFileList,
      commitFile,
      approvalDesign,
      updateBOMInfo,
      getReasonContent,
      updateReasonContent,
      fileType,
      fileParams,
      selectFile,
      uploadFile,
      updateFile,
      handlePaste,
      downloadFile,
    }
  }
});
</script>

<style lang="scss" scoped>
.form {
  &-container {
    position: relative;
    background: white;
    border-radius: 4px;
    border: solid 1px transparent;
    margin-top: 10px;
    &-active {
      border: solid 1px $color-bd-grey;
    }
  }
  &-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    border: solid 1px $color-bd-grey;
    padding: 12px;
    border-radius: 4px;
  }
  &-content {
    flex: 1;
  }
  &-add {
    margin-left: 10px;
    &-img {
      width: 60px;
      height: 60px;
      object-fit: contain;
    }
  }
  &-textarea {
    font-size: 14px;
    color: $color-text-gray;
    background: $color-bg-white;
    border: solid 1px $color-bd-grey;
    border-radius: 4px;
    padding: 8px;
    textarea {
      font-size: 14px;
      width: 100%;
      min-width: 400px;
      min-height: 40px;
      border: none;
      outline: none;
      background: transparent;
    }
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &-li {
    margin: 5px 5px 5px 0;
    background: #F1F5FF;
    position: relative;
    border: solid 1px $color-bd-grey;
    border-radius: 2px;
    padding: 3px 6px;
    &-text {
      color: $color-text-blue;
      font-size: 12px;
      text-decoration: underline;
    }
    &-image {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &-del {
      display: none;
    }
    &:hover {
      border: solid 1px $color-bd-blue;
      .form-li-del {
        position: absolute;
        top: 0;
        right: 0;
        width: 14px;
        height: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        background: #86ABF6;
        color: #FFFFFF;
        cursor: pointer;
        transform: translate(50%, -50%) rotate(45deg);
      }
    }
  }
}

.design {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 40px;
  overflow: auto;
  &-item {
    padding-left: 12px;
    &-title {
      margin-top: 20px;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: -12px;
        width: 4px;
        height: 17px;
        border-radius: 2px;
        background: #3A78F4;
        transform: translate(0, -50%);
      }
      &-black {
        font-size: 16px;
        color: #000000;
      }
      &-gray {
        font-size: 14px;
        color: #999999;
      }
      &-blue {
        font-size: 14px;
        color: #3A78F4;
      }
      &-red {
        font-size: 14px;
        color: #FF0707;
      }
      &-left {
        margin-left: 16px;
      }
    }
  }
  &-cells {
    margin: 0px;
  }
  &-cell {
    margin-top: 20px;
    padding-left: 16px;
    border-top: solid 1px #D2D2D2;
    &:nth-of-type(1) {
      margin-top: 0px;
      border-top: solid 1px transparent;
    }
    &-title {
      position: relative;
      &:after {
        content: "";
        position: absolute;
        top: 5px;
        left: -16px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #3A78F4;
      }
    }
    &-text {
      margin-top: 20px;
      &-image {
        width: 14px;
      }
      &-black {
        font-size: 14px;
        color: #000000;
      }
      &-gray {
        font-size: 14px;
        color: #999999;
      }
      &-blue {
        font-size: 14px;
        color: #3A78F4;
      }
      &-red {
        font-size: 14px;
        color: #FF0707;
      }
      &-left {
        margin-left: 32px;
      }
    }
  }
  &-list {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &-li {
    margin: 20px 20px 20px 0;
    text-align: center;
    &-mask {
      opacity: 0.6;
    }
    &-buttons {
      width: 80px;
      height: 80px;
      background: white;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
    }
    &-button {
      padding: 6px 15px;
      border-radius: 4px;
      font-size: 14px;
      color: #666666;
      background: #FFFFFF;
      border: 1px solid #3A78F4;
      cursor: pointer;
      &-blue {
        color: #FEFEFE;
        background: #3A78F4;
        border: 1px solid #3A78F4;
      }
    }
    &-box {
      width: 80px;
      height: 80px;
      border: solid 1px #E5E5E5;
      background: white;
      position: relative;
      overflow: hidden;
      &-active {
        border: solid 1px #3A78F4;
      }
      &-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &-mask {
          opacity: 0.6;
        }
        &-icon {
          width: 43px;
        }
        &-text {
          font-size: 12px;
          margin-top: 6px;
          color: #1B1B1B;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 70px;
        }
      }
      &-header {
        position: absolute;
        top: 0;
        left: 0;
        background: #30C048;
        color: white;
        padding: 2px 3px;
        font-size: 12px;
        border-radius: 0 0 4px 0;
      }
      &:hover &-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(0,0,0,.6);
        padding: 2px 4px;
        text-align: center;
        color: white;
        font-size: 14px;
        transition: all .3s;
        transform: translateY(0);
        cursor: pointer;
      }
      &-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(0,0,0,.6);
        padding: 2px 4px;
        text-align: center;
        color: white;
        font-size: 14px;
        transition: all .3s;
        transform: translateY(100%);
        cursor: pointer;
      }
    }
    &-text {
      color: #999999;
      font-size: 12px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100px;
    }
  }
  &-col {
    margin: 0;
  }
  &-row {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    &-label {
      font-size: 14px;
      color: #1B1B1B;
    }
    &-content {
      flex: 1;
      &-text {
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &-icon {
          width: 14px;
        }
        &-black {
          font-size: 14px;
          color: #000000
        }
        &-gray {
          font-size: 14px;
          color: #999999;
        }
        &-blue {
          font-size: 14px;
          color: #3A78F4;
        }
        &-red {
          font-size: 14px;
          color: #FF0707;
        }
        &-left {
          margin-left: 16px;
        }
        &-circle {
          width: 12px;
          height: 12px;
          border-radius: 100px;
          border: solid 1px $color-bd;
          position: relative;
          margin-right: 4px;
          cursor: pointer;
          &-active {
            border: solid 1px $color-bd-blue;
            &:after {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              width: 6px;
              height: 6px;
              transform: translate(-50%, -50%);
              border-radius: 100px;
              background: $color-bg-blue;
            }
          }
        }
      }
      &-buttons {
        margin-top: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      &-button {
        padding: 6px 15px;
        border-radius: 4px;
        font-size: 14px;
        color: #666666;
        background: #FFFFFF;
        border: 1px solid #3A78F4;
        cursor: pointer;
        &-blue {
          color: #FEFEFE;
          background: #3A78F4;
          border: 1px solid #3A78F4;
        }
      }
    }
  }
}
</style>
