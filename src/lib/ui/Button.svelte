<script>
    export let type = 'button'; // Loại nút (button, submit, reset)
    export let color = 'primary'; // Kiểu nút (primary, secondary, outline)
    export let size = 'md'; // Kích thước nút (sm, md, lg)
    export let disabled = false; // Nút có bị vô hiệu hóa hay không

    // Hàm xử lý sự kiện click (tùy chọn)
    const handleClick = () => {
    // ...
    };
</script>

<button
    class="btn btn-{color} btn-{size}"
    type={type}
    disabled={disabled}
    on:click={handleClick}
>
    <slot>Button</slot>
</button>