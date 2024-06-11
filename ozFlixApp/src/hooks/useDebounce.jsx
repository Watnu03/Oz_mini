import { useEffect, useState } from 'react';


//value값을 useEffect안에서 관리
const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
      //setTimeout()은 특정시간이 지난 다음 코드를 실행함
      //delay만큼 시간 지연하고 handler함수 실행
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        //clearTimeout()은 setTimeout을 취소하고 싶을때 쓰는 반환 식별자
        //useEffect내부에서 return을 하게되면 컴포넌트가 제거될때 해당 코드들이 실행됩니다.(clean-up)

        //내가 설정한 딜레이값 시간이 초기화가 된다고 생각함
        //내가 입력을 다하기전까지 딜레이 시간이 계속 초기화 되고 다 입력하면 딜레이시간이 그때부터흐름
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debounceValue;
};

export default useDebounce;