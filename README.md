# LaboratorioAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Funcinalidades

## Usuario 

## Todos los roles

    En este apartado contamos con las siguientes funcionalidades:

    Registro: permite registrar un nuevo usuario seteando id, email, telefono, contraseña y asignandole por defecto el role user y el boleano enabled.

    Inicio de sesion: permite loguearse en el sistema con el usuario y contraseña y hace controles de authenticacion y redireccion. Para esto el usuario debe estar registrado y habilitado.

    Olvido de contraseña: ingresando el correo electronico de un usuario registrado y habilitado el sistema "envia un link" para registrar una nueva contraseña y confirmacion de nueva contraseña.

    Cuenta: cada usuario logueado puede acceder al menu cuenta en el cual se muestran sus datos personales, un boton para acceder a sus pedidios (si existen) y un boton para cambiar su contraseña actual. 

    Cambiar Contraseña: Un usuario logueado puede cambiar su contraseña accediendo al apartado mi cuenta/cambiar contraseña seteando contraseña anterior y nueva contraseña y confirmación de nueva contraseña.

    Cerrar Sesion: un usuario logueado puede desloguearse apretando este boton.

    Productos: Todos los usuarios logueados pueden acceder a la vista productos en la cual se listan todos los productos habilitados, cuenta con barras de filtrado por nombre, precio minimo y maximo. Cada card de producto tiene la opcion de pedir un producto por cada click sobre el mismo lo que los agrega en el carrito de compras.

    Carrito de compras: Cada usuario tiene su carrito de compra que se va cargando a medida que da click en "pedir" (ver seccion anterior Productos), en el mismo tiene la posibilidad de sumar "+" o quitar "-" de la cantidad de un producto o eliminar en caso de arrepentirse o no ser el deseado, tambien calcula y actualiza el total del pedido en cada accion. Luego de completada y verificada la lista de productos a pedir debe completar la fecha deseada de retiro del pedido y Finalizar Pedido. Al hacerlo el pedido se carga a la lista de pedidos del usuario y se setea el estado en pendiente.  

    Mis Pedidos: todos los usuarios logueados pueden ver, listar y filtrar sus pedidos realizados, a esta funcionalidad se accede desde la navbar y desde un boton en cuenta.

## Rol Panadero

    Ademas de las funcionalidades detalladas en todos los roles adiciona:

    Pedidos: en este apartado ubicado en el centro de la navbar puede ver los pedidos realizados, puede filtrar y cambiar el estado de los mismos. En filtrado puede hacerlo por estado, fecha desde, fecha hasta y por cliente. En base al resultado de los filtros se listan todas las cards que cumplen con la o las condiciones de filtrado. En cada card puede mostrar los insumos necesarios para realizar cada item del pedido. Tambien puede cambiar los estados, estos son: PENDIENTE cuando ingresa un pedido, EN PREPARACION cuando toma un pedido para realizarlo, LISTO PARA RETIRAR cuando esta pronto. 
    Por otro lado tambien cuenta con un boton swich que cambia entre mostrarPedidos y Mostrar insumos dependiendo de la vista en la que se encuentre. Mostrar insumos asimismo como mostrar pedidos, lista las necesidades de insumos en base a las condiciones de filtrado seteadas.

## Rol Administrador

    Ademas de las funcionalidades detalladas en rol Panadero adiciona:

    Listar Usuarios: esta funcionalidad le permite listar los usuarios registrados, deshabilitarlos y habilitarlos en caso de necesidad y ajustarle las credenciales pudiendo cambiar el rol de cada usuario. Ademas tiene la posibilidad de filtrar usuarios por email, rol o telefono.

    Listar Insumos: le permite hacer operaciones crud, permite crear , listar, editar y eliminar con soft delete para precargar los ingredientes para confeccion de Productos.

    Crear Producto: permite al administrador dar de alta un nuevo producto, setearle nombre, descripcion, Imagen, precio y agregarle los insumos necesarios para confeccionarlos (deben estar precargados en la lista de insumos) seteando el insumo y la cantidad necesaria en base a la unidad de medida. En el proceso de carga tambien puede eliminar insumos que considere erroneos. Luego confirma con Crear Producto.

    Productos: en el componente ademas de mostrar los distintos productos el administrador puede actualizar directamente desde la card, lo que le permite editar datos, precio e imagen y eliminar el producto, lo que se realiza con softdelete que le permite poder activar posteriormente, esta funcionalidad tambien permite quitar de cartelera el producto en caso de algun faltante y publicarlo nuevamente a demanda.

## Adicionales 

    Validaciones de formulario: mensajes y notificaciones ante omision o error de datos ingresados mejorando la experiencia de usuario.

    Responsividad: se cuidan los formatos de las distintas componentes para su correcta visualizacion en distintos dispositivos, moviles, tablets y escritorio.
    
    Paginación: en las vistas de productos, pedidos, listar insumos, usuarios se le agrega paginación para facilitar la visualizacion.

    Filtrado: las listas de productos, insumos, pedidos, usuarios cuentan con distintos filtrados para facilitar la experiencia de usuario.

