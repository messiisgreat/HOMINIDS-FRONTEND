const WalletConnectBtn = (props) => {
  return (
    <div className={`invisible relative z-10 flex flex-row gap-7 pl-2 sm:visible`}>
      <button
        className={`flex gap-[10px] rounded-full px-5 py-[19.5px] uppercase !text-white`}
        onClick={props.onClick}
        style={{
          background: 'linear-gradient(97.97deg, #F8D46B 1.78%, #A74FBE 37.37%, #302072 89.89%)',
        }}
      >
        <img
          src="/assets/connectBtns/wallet-02.png"
          className={props.classes['btn-icon']}
          alt="wallet"
        />
        Connect wallet
        {/* <span className={props.classes['btn-line']}> | </span> */}
        {/* <img
          src="/assets/connectBtns/profile.png"
          className={props.classes['btn-icon']}
          alt="wallet"
        /> */}
      </button>
    </div>
  );
};

export default WalletConnectBtn;
