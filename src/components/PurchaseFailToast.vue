<template>
  <div class="custom-fail-toast">
    <div class="fail-toast-content">
      <i class="fas fa-solid fa-xmark fail-check"></i>
      <div class="message">
        <span class="fs-5 fw-medium ff-chonburi">Failed</span>
        <span class="fs-6">Your transaction has not been cancelled!</span>
        <span class="fs-6 purchase-fail-toast-information">Insufficient fund.</span>
      </div>
      <i class="fa-solid fa-xmark fail-close"></i>
    </div>
  </div>
</template>

<style>
  .custom-fail-toast {
    position: fixed;
    background: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0, 1);
    top: 25px;
    right: 30px;
    border-radius: 12px;
    padding: 20px 35px 20px 25px;
    border-left: 6px solid #FF392E;
    overflow: hidden;
    transform: translateX(calc(100% + 30px));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
    z-index: 1;
  }
  .custom-fail-toast.active {
    transform: translateX(0%);
  }
  .custom-fail-toast .fail-toast-content {
    display: flex;
    align-items: center;
  }
  .fail-toast-content .message {
    display: flex;
    flex-direction: column;
    margin: 0 20px;
  }
  .fail-toast-content .fail-check {
    display: flex;
    height: 35px;
    width: 35px;
    background-color: #FF392E;
    color: #fff;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .custom-fail-toast .fail-close {
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7;
  }
  .custom-fail-toast .fail-close:hover {
    opacity: 1;
  }
</style>
