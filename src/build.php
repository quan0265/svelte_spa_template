<?php 

// Build for spa

function get_html_svelte_spa() {
    $files = scandir("./.svelte-kit/output/client/_app/immutable/entry/");
    $name_start_js = '';
    $name_app_js = '';
    foreach ($files as $name) {
        if (preg_match('/^start/', $name)) {
            $name_start_js = $name;
        }
        if (preg_match('/^app/', $name)) {
            $name_app_js = $name;
        }
    }

    $files = scandir("./.svelte-kit/output/client/_app/immutable/chunks/");
    $object_name = '';
    foreach ($files as $name) {
        if ($name == '.' || $name == '..') continue;
        $entry_content = file_get_contents("./.svelte-kit/output/client/_app/immutable/chunks/$name");
        $check = preg_match('/globalThis.__sveltekit_([0-9a-z]+)/', $entry_content, $matches);
        if ($check) {
            $object_name = $matches[1];
            break;
        }
    }

    $content = file_get_contents('src/app.html');

    $content = str_replace('%sveltekit.head%', '', $content);
    $body_script ='
        <script>
            {
                __sveltekit_'.$object_name.' = {
                    base: new URL(".", location).pathname.slice(0, -1),
                    assets: "/sales"
                };

                const element = document.currentScript.parentElement;

                Promise.all([
                    import("./_app/immutable/entry/'. $name_start_js .'"),
                    import("./_app/immutable/entry/'. $name_app_js .'")
                ]).then(([kit, app]) => {
                    kit.start(app, element);
                });
            }
        </script>' . "\n		";
    $html = str_replace('%sveltekit.body%', $body_script, $content);
    
    $html = preg_replace('/src\//', '', $html);
    
    $html = preg_replace('/.css"/', '.css' . '?v=' . time() . '"', $html);
    $html = preg_replace('/.js"/', '.js' . '?v=' . time() . '"', $html);
    return $html;
}

$html = get_html_svelte_spa();

file_put_contents('./.svelte-kit/output/client/index1.html', $html);
file_put_contents('./.svelte-kit/output/client/index1.php', $html);

// chèn thêm cho route / 1, 2
$html2 = str_replace('new URL("."', 'new URL(".."', $html);
$html2 = str_replace('import("./_app/', 'import("../_app/', $html2);
file_put_contents('./.svelte-kit/output/client/index2.php', $html2);

$html3 = str_replace('new URL("."', 'new URL("../.."', $html);
$html3 = str_replace('import("./_app/', 'import("../../_app/', $html3);
file_put_contents('./.svelte-kit/output/client/index3.php', $html3);

//copyFolder('src/assets', './.svelte-kit/output/client/assets');
//copyFolder('src/public', './.svelte-kit/output/client/public');



$content = '<?php 
$uri = $_SERVER["REQUEST_URI"];
if (preg_match("/\/sales/", $uri)) {
    $uri = $_SERVER["REQUEST_URI"];
    $uri = explode("?", $uri)[0];
    if (preg_match("/\/sales/", $uri)) {
        $path_name = explode("/sales", $uri)[1];
        $arr = explode("/", $path_name);
        $index = count($arr) - 1;
        include "index".$index.".php";
        exit;
    }
}

?>
';

file_put_contents('./.svelte-kit/output/client/index.php', $content);



?>