<template>
  <div class="custom-toast">
    <div class="toast-content">
      <i class="fas fa-solid fa-check check"></i>
      <div class="message">
        <span class="fs-5 fw-medium ff-chonburi">Success</span>
        <span class="fs-6">Your transaction is completed!</span>
        <span class="fs-6 purchase-toast-information">is now added to your inventory.</span>
      </div>
      <i class="fa-solid fa-xmark close"></i>
    </div>
  </div>
</template>

<style>
  .custom-toast {
    position: fixed;
    background: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0, 1);
    top: 25px;
    right: 30px;
    border-radius: 12px;
    padding: 20px 35px 20px 25px;
    border-left: 6px solid #198754;
    overflow: hidden;
    transform: translateX(calc(100% + 30px));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
    z-index: 1;
  }
  .custom-toast.active {
    transform: translateX(0%);
  }
  .custom-toast .toast-content {
    display: flex;
    align-items: center;
  }
  .toast-content .message {
    display: flex;
    flex-direction: column;
    margin: 0 20px;
  }
  .toast-content .check {
    display: flex;
    height: 35px;
    width: 35px;
    background-color: #198754;
    color: #fff;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .custom-toast .close {
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7;
  }
  .custom-toast .close:hover {
    opacity: 1;
  }
</style>
