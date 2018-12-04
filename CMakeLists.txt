cmake_minimum_required(VERSION 2.6)
project(sensor_config)

set(CMAKE_C_STANDARD 99)
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# add_compile_options(-std=c++11)

set(src_path  ./src/)


include_directories(
    ${src_path}/
    ./include
    ${CMAKE_PREFIX_PATH}/usr/include/hisi-osdrv2/
)

link_directories(
    ${CMAKE_PREFIX_PATH}/usr/lib/hisi-osdrv2/
)

set(CMAKE_INTERPROCEDURAL_OPTIMIZATION TRUE)
# set(CMAKE_C_FLAGS "-Os -ffunction-sections -Wl,--gc-sections -fno-asynchronous-unwind-tables -Wl,--strip-all")

#set(HILIBS
#    isp         # ISP_AlgRegisterDehaze
#    _hiae       # HI_MPI_AE_Register/HI_MPI_AE_UnRegister, HI_MPI_AE_SensorRegCallBack/HI_MPI_AE_SensorUnRegCallBack
#    _hiawb      # HI_MPI_AWB_Register/HI_MPI_AWB_UnRegister, HI_MPI_AWB_SensorRegCallBack/HI_MPI_AWB_SensorUnRegCallBack
#    _hiaf       # HI_MPI_AF_Register/HI_MPI_AF_UnRegister
#    _hidefog    # ISP_AlgRegisterDehaze
#    pthread m dl
#    ive         # HI_MPI_IVE_DMA, HI_MPI_IVE_Query, ISP_AlgRegisterDehaze
#    md          # ISP_AlgRegisterDehaze
#    mpi
#    tde         # ISP_AlgRegisterDehaze
#    upvqe       # HI_UPVQE_Create/HI_UPVQE_Destroy, HI_UPVQE_ReadFrame/HI_UPVQE_WriteFrame, HI_UPVQE_GetVolume/HI_UPVQE_SetVolume, HI_UPVQE_GetConfig
#    dnvqe       # ISP_AlgRegisterDehaze, HI_DNVQE_Create/HI_DNVQE_Destroy, HI_DNVQE_ReadFrame/HI_DNVQE_WriteFrame, HI_DNVQE_GetConfig
#    VoiceEngine # ISP_AlgRegisterDehaze, HI_VOICE_EncodeFrame/HI_VOICE_DecodeFrame, HI_VOICE_EncReset/HI_VOICE_DecReset
#)

add_executable(sensor_config
    ${src_path}/main.h
    ${src_path}/main.c
    ${src_path}/stack.c
)
target_link_libraries(sensor_config ${HILIBS} libwebsockets.a crypto ssl)

install(TARGETS sensor_config RUNTIME DESTINATION /usr/bin/)
